import {useEffect, useState} from "react";
import {IProduct} from "@/commons/interfaces.ts";
import ProductService from "@/service/ProductService.ts";
import {Link} from "react-router-dom";
import {Cards} from "@/components/Card";
import {Box, Grid, GridItem, SimpleGrid} from "@chakra-ui/react";

export function ProductListPage(){
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

    const onClickRemove = async (id?: number) => {
        setApiError(false);
        setApiMessage("");
        setApiSuccess(false);
        if(id){
            const response = await ProductService.remove(id);
            if (response.status === 204) {
                setData(data.filter((product) => product.id !== id));
                setApiSuccess(true);
                setApiMessage("Produto removido com sucesso");
            }else {
                setApiError(true);
                setApiMessage("Falha ao remover o produto");
            }
        }
    }
    return (
        <>
            <main className="p-3">

                <SimpleGrid minChildWidth='200px' spacing='40px'>
                    {data.map(product => (
                        <Box key={product.id}>
                            <Cards product={product}></Cards>
                        </Box>
                    ))}
                </SimpleGrid>
                {/*<Grid templateColumns='repeat(5, 1fr)' gap={6}>*/}
                {/*    {data.map(product => (*/}
                {/*        <GridItem key={product.id}>*/}
                {/*            <Cards product={product}></Cards>*/}
                {/*        </GridItem>*/}
                {/*    ))}*/}
                {/*</Grid>*/}
                {apiError && (
                    <div className="alert alert-danger" role="alert">
                        {apiMessage}
                    </div>
                )}
                {apiSuccess && (
                    <div className="alert alert-success" role="alert">
                        {apiMessage}
                    </div>
                )}
            </main>

        </>
    )
}