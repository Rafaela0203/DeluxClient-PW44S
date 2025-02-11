import {
    Card,
    CardBody,
    Image,
    Stack,
    Heading,
    Text,
    CardFooter,
} from '@chakra-ui/react';
import {IProduct} from "@/commons/interfaces.ts";
import {ButtonAddToCart} from "@/components/ButtonAddToCart";

export function Cards({product}: { product: IProduct }) {
    const formatPrice = (price: number) => price.toFixed(2).replace(".", ",");

    return (
        <>
            <Card  >
                <CardBody>
                    <Image
                        src={product.image}
                        alt={product.name}
                        borderRadius='lg'
                    />
                    <Stack mt='6' spacing='2'>
                        <Heading size='md' color={"red.600"}>{product.brand}</Heading>
                        <Text>
                            {product.name} {/* Aqui você pode usar a descrição do produto */}
                        </Text>
                        <Text color='red.600' fontSize='2xl'>
                            R${formatPrice(product.price)}
                        </Text>
                    </Stack>
                </CardBody>
                <CardFooter>
                    <ButtonAddToCart product={product} />
                </CardFooter>
            </Card>
        </>
    );
}