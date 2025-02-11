import {
    Card,
    CardBody,
    Image,
    Stack,
    Heading,
    Text,
    CardFooter,
} from '@chakra-ui/react';
import { IProduct } from "@/commons/interfaces.ts";
import { ButtonAddToCart } from "@/components/ButtonAddToCart";
import { Link } from "react-router-dom";

export function Cards({ product }: { product: IProduct }) {
    const formatPrice = (price: number) => price.toFixed(2).replace(".", ",");

    return (
        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
            <Card _hover={{ boxShadow: "lg", transform: "scale(1.02)", transition: "0.2s" }}>
                <CardBody>
                    <Image
                        src={product.image}
                        alt={product.name}
                        borderRadius="lg"
                        objectFit="cover"
                        w="100%"
                        h="200px"
                    />
                    <Stack mt='6' spacing='2'>
                        <Heading size='md' color="red.600">{product.brand}</Heading>
                        <Text>
                            {product.name}
                        </Text>
                        <Text color='red.600' fontSize='2xl'>
                            R$ {formatPrice(product.price)}
                        </Text>
                    </Stack>
                </CardBody>
                <CardFooter>
                    <ButtonAddToCart product={product} />
                </CardFooter>
            </Card>
        </Link>
    );
}
