import {useEffect, useState} from "react";
import {IProduct} from "@/commons/interfaces.ts";
import ProductService from "@/service/ProductService.ts";
import {Cards} from "@/components/Card";
import {Box, Button, SimpleGrid, Flex} from "@chakra-ui/react";

export function ProductListPage(){
    const [data, setData] = useState<IProduct[]>([]);
    const [filteredData, setFilteredData] = useState<IProduct[]>([]);
    const [apiError, setApiError] = useState<boolean>(false);
    const [apiMessage, setApiMessage] = useState<string>("");
    const [apiSuccess, setApiSuccess] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;

    useEffect(() => {
        loadData();
        categoryFilter(5);
    }, []);

    const loadData = async () => {
        setApiError(false);
        setApiMessage("");
        const response = await ProductService.findAll();
        if (response.status === 200) {
            setData(response.data);
        } else {
            setApiError(true);
            setApiMessage("Falha ao carregar os dados");
            setData([]);
        }
    };

    const categoryFilter = async (categoryId?: number) => {
        setApiError(false);
        setApiMessage("");
        setApiSuccess(false);
        if (categoryId) {
            const response = await ProductService.findByCategory(categoryId);
            if (response.status === 200) {
                setFilteredData(response.data);
                setApiSuccess(true);
                setApiMessage("Produtos carregados");
            } else {
                setApiError(true);
                setApiMessage("Falha ao carregar os dados");
                setFilteredData([]);
            }
        }
    };

    const onClickRemove = async (id?: number) => {
        setApiError(false);
        setApiMessage("");
        setApiSuccess(false);
        if (id) {
            const response = await ProductService.remove(id);
            if (response.status === 204) {
                setData(data.filter((product) => product.id !== id));
                setApiSuccess(true);
                setApiMessage("Produto removido com sucesso");
            } else {
                setApiError(true);
                setApiMessage("Falha ao remover o produto");
            }
        }
    };

    // Lógica de Paginação
    const totalPages = Math.ceil(data.length / productsPerPage);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const paginatedData = data.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
        <>
            <main className="p-3 container">
                <SimpleGrid minChildWidth='200px' spacing='40px'>
                    {paginatedData.map(product => (
                        <Box key={product.id}>
                            <Cards product={product}></Cards>
                        </Box>
                    ))}
                </SimpleGrid>
                <Flex justify="center" mt={4} gap={2} align="center">
                    <Button onClick={() => setCurrentPage(currentPage - 1)} isDisabled={currentPage === 1}>Anterior</Button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <Button
                            key={i + 1}
                            onClick={() => setCurrentPage(i + 1)}
                            colorScheme={currentPage === i + 1 ? "red" : "gray"}
                        >
                            {i + 1}
                        </Button>
                    ))}
                    <Button onClick={() => setCurrentPage(currentPage + 1)} isDisabled={currentPage >= totalPages}>Próximo</Button>
                </Flex>
                {apiError && (
                    <div className="alert alert-danger" role="alert">
                        {apiMessage}
                    </div>
                )}
            </main>
        </>
    );
}