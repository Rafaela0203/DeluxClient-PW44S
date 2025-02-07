import { Card, CardBody, Image, Stack, Heading, Text, Divider, CardFooter } from '@chakra-ui/react';
import {IProduct} from "@/commons/interfaces.ts";
import {ButtonAddToCart} from "@/components/ButtonAddToCart";

export function Cards({product}: { product: IProduct }) {
    const addToCart = (product: IProduct) => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
    };



    return (
        <>
            <Card maxW='sm' >
                <CardBody>
                    <Image
                        src={product.image}
                        alt={product.name}
                        borderRadius='lg'
                    />
                    <Stack mt='6' spacing='3'>
                        <Heading size='md' color={"red.600"}>{product.brand}</Heading>
                        <Text>
                            {product.description} {/* Aqui você pode usar a descrição do produto */}
                        </Text>
                        <Text color='red.600' fontSize='2xl'>
                            R${(product.price).toFixed(2)}
                        </Text>
                    </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                    <ButtonAddToCart product={product} onClick={addToCart} />;
                </CardFooter>
            </Card>
        </>
    );
}