import { Button } from "@chakra-ui/react";
import { IProduct } from "@/commons/interfaces.ts";

interface IButtonAddToCart {
    product: IProduct;
    onClick: (product: IProduct) => void;
}

export function ButtonAddToCart({ product, onClick }: IButtonAddToCart) {
    return (
        <Button variant="ghost" bg="red.600" onClick={() => onClick(product)}>
            Add to cart
        </Button>
    );
}
