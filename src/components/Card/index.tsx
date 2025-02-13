import { Card, CardBody, Image, Stack, Heading, Text, CardFooter, Button } from "@chakra-ui/react";
import { IProduct } from "@/commons/interfaces.ts";


import { Link } from "react-router-dom";
import {AddToCart} from "@/components/AddToCart";


export function Cards({ product }: { product: IProduct }) {
    const { addToCart, alertDialog } = AddToCart();

    return (
        <>

                <Card _hover={{ boxShadow: "lg", transform: "scale(1.02)", transition: "0.2s" }}>
                    <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                    <CardBody>
                        <Image src={product.image} alt={product.name} borderRadius="lg" objectFit="cover" />
                        <Stack mt="6" spacing="2">
                            <Heading size="md" color="red.600">{product.brand}</Heading>
                            <Text>{product.name}</Text>
                            <Text color="red.600" fontSize="2xl">
                                R$ {product.price.toFixed(2).replace(".", ",")}
                            </Text>
                        </Stack>
                    </CardBody>
                    </Link>
                    <CardFooter >
                        <Button color="white" bg="red.600"  _hover={{ bg: "red.700" }} onClick={() => addToCart(product)}>
                            Comprar
                        </Button>
                    </CardFooter>
                </Card>

            {alertDialog}
        </>
    );
}
