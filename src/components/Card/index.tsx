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
    return (
        <>
            <Card maxW='lg' maxH={'lg'} size={'lg'} >
                <CardBody>
                    <Image
                        src={product.image}
                        alt={product.name}
                        borderRadius='lg'
                    />
                    <Stack mt='6' spacing='3'>
                        <Heading size='md' color={"red.600"}>{product.brand}</Heading>
                        <Text>
                            {product.name} {/* Aqui você pode usar a descrição do produto */}
                        </Text>
                        <Text color='red.600' fontSize='2xl'>
                            R${(product.price).toFixed(2)}
                        </Text>
                    </Stack>
                </CardBody>
                <CardFooter>
                    <ButtonAddToCart product={product} />;
                </CardFooter>
            </Card>
        </>
    );
}