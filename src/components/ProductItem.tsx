/* eslint-disable react/display-name */
import { memo, useState } from "react";
import dynamic from "next/dynamic";
import { AddProductToWishlistProps } from "./AddProductToWishlist";
import lodash from "lodash";
import { loadavg } from "os";

// import { AddProductToWishlist } from "./AddProductToWishlist";

const AddProductToWishlist = dynamic<AddProductToWishlistProps>(() => {
    return import("./AddProductToWishlist").then(mod => mod.AddProductToWishlist)
}, {
    loading: () => <span>Carregando ...</span>
})

interface ProductItemProps {
    product: {
        id: number;
        price: number;
        title: string;
        priceFormatted: string;
    }
    onAddToWishList: (id: number) => void;
}

function ProductItemComponent({ product, onAddToWishList }: ProductItemProps) {
    const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

    return (
        <div>
            {product.title} - <strong>{product.priceFormatted}</strong>
            <button onClick={() => setIsAddingToWishlist(true)}>Adionar na favoritos</button>

            {isAddingToWishlist &&
                <AddProductToWishlist
                    onAddToWishlist={() => {
                        onAddToWishList(product.id)
                        setIsAddingToWishlist(false)
                    }}
                    onRequestClose={() => setIsAddingToWishlist(false)}
                />
            }
        </div>
    );
}

export const ProductItem = memo(ProductItemComponent, (prevProsps, nextProps) => {
    return lodash.isEqual(prevProsps.product, nextProps.product);
});