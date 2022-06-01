import { useMemo } from "react";
import { ProductItem } from "./ProductItem";

interface SearchResultsProps {
    totalPrice: number;
    results: Array<{
        id: number;
        price: number;
        title: string;
    }>;
    onAddToWishList: (id: number) => void;
}

export function SearchResults({ results, onAddToWishList, totalPrice }: SearchResultsProps) {
    return (
        <div>
            <h2>{totalPrice}</h2>
            {results.map(product => {
                return (
                    <ProductItem key={product.id} product={product} onAddToWishList={onAddToWishList} />
                )
            })}
        </div>
    );
}


// const totalPrice = useMemo(() => {
//     return results.reduce((total, product) => {
//         return total + product.price
//     }, 0)
// }, [results]);