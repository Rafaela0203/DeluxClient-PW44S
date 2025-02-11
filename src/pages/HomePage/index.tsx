import ChakraCarousel from "@/components/Carousel";
import {Cards} from "@/components/Card";
import ProductService from "@/service/ProductService.ts";
import {useEffect, useState} from "react";
import {IProduct} from "@/commons/interfaces.ts";
import {Box, Grid, GridItem, SimpleGrid} from "@chakra-ui/react";

export function HomePage() {
    const [data, setData] = useState<IProduct[]>([]);
    const [apiError, setApiError] = useState<boolean>(false);
    const [apiMessage, setApiMessage] = useState<string>("");
    const [apiSuccess, setApiSuccess] = useState<boolean>(false);

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
        <main className={"container"}>
            <div className="text-center p-4">
                <ChakraCarousel/>
            </div>
            <SimpleGrid minChildWidth='200px' spacing='40px'>
                {data.map(product => (
                    <Box key={product.id}>
                        <Cards product={product}></Cards>
                    </Box>
                ))}
            </SimpleGrid>
        </main>

    </>
    );
}
