import ChakraCarousel from "@/components/Carousel";
import {Cards} from "@/components/Card";
import ProductService from "@/service/ProductService.ts";
import {useEffect, useState} from "react";
import {IProduct} from "@/commons/interfaces.ts";
import {Grid, GridItem} from "@chakra-ui/react";

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
      <div className="text-center p-4">
        <ChakraCarousel />
      </div>
        <Grid templateColumns='repeat(5, 1fr)' gap={6}>
            {data.map(product => (
                <GridItem w='100%' h='10' key={product.id}>
                    <Cards product={product}></Cards>
                </GridItem>
            ))}
        </Grid>
        <div>

        </div>
    </>
  );
}
