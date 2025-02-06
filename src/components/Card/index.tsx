import { Card, CardBody, Image, Stack, Heading, Text, Divider, CardFooter, ButtonGroup, Button } from '@chakra-ui/react';
import {IProduct} from "@/commons/interfaces.ts";

export function Cards({product}: { product: IProduct }) {
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
                    <ButtonGroup spacing='2'>
                        <Button variant={"ghost"} bg={"red.600"}>
                            Add to cart
                        </Button>
                    </ButtonGroup>
                </CardFooter>
            </Card>
        </>
    );
}