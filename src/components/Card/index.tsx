import {Card, CardBody, CardFooter, Image, Stack, Heading, Text, Button, Divider, ButtonGroup} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {IProduct} from "@/commons/interfaces.ts";
import {useNavigate} from "react-router-dom";
import ProductService from "@/service/ProductService.ts";

export function Cards() {
    const [data, setData] = useState<IProduct[]>([]);
    const [apiError, setApiError] = useState<boolean>(false);
    const [apiMessage, setApiMessage] = useState<String>("");
    const [apiSuccess, setApiSuccess] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        loadData();

    }, []);

    const loadData = async () => {
        setApiError(false);
        setApiMessage("")

        const response = await ProductService.findAll();
        if (response.status === 200) {
            setData(response.data);
        }else {
            setApiError(true);
            setApiMessage("Falha ao carregar os dados");
            setData([]);
        }
    }

    return (
        <>
            {data.map((product: IProduct) => (
                <Card maxW='sm' key={product.id}>
                    <CardBody>
                        <Image
                            src={product.image}
                            alt={product.name}
                            borderRadius='lg'
                        />
                        <Stack mt='6' spacing='3'>
                            <Heading size='md'>{product.name}</Heading>
                            <Text>
                                This sofa is perfect for modern tropical spaces, baroque inspired
                                spaces, earthy toned spaces and for people who love a chic design with a
                                sprinkle of vintage design.
                            </Text>
                            <Text color='blue.600' fontSize='2xl'>
                                $450
                            </Text>
                        </Stack>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                        <ButtonGroup spacing='2'>
                            <Button variant='solid' colorScheme='blue'>
                                Buy now
                            </Button>
                            <Button variant='ghost' colorScheme='blue'>
                                Add to cart
                            </Button>
                        </ButtonGroup>
                    </CardFooter>
                </Card>
            ))};

        </>
    )
}

