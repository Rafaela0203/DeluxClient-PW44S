import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {IProduct, IProductInfo} from "@/commons/interfaces.ts";
import ProductService from "@/service/ProductService";
import {
    Box, Image, Text, Heading, Button, Stack, Divider, Input, Flex, Badge, VStack, SimpleGrid
} from "@chakra-ui/react";
import {Cards} from "@/components/Card";

export function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState<IProductInfo | null>(null);
    const [filteredData, setFilteredData] = useState<IProduct[]>([]);
    const [apiError, setApiError] = useState(false);
    const [installmentPrice, setInstallmentPrice] = useState<string>("");

    useEffect(() => {
        loadProduct();
        categoryFilter(product?.category.id)
    }, [id]);

    const loadProduct = async () => {
        setApiError(false);
        const response = await ProductService.findById(id);
        if (response.status === 200) {
            setProduct(response.data);

            // Calcula o valor parcelado em até 10x
            const installment = (Math.floor(response.data.price * 100 / 10) / 100).toFixed(2).replace(".", ",");
            setInstallmentPrice(installment);
        } else {
            setApiError(true);
        }
    };

    const categoryFilter = async (categoryId?: number) => {
        // setApiError(false);
        // setApiMessage("");
        // setApiSuccess(false);
        if(categoryId){
            const response = await ProductService.findByCategory(categoryId);
            if(response.status === 200){
                setFilteredData(response.data);
                // setApiSuccess(true);
                // setApiMessage("Produtos carregados");
            }else {
                // setApiError(true);
                // setApiMessage("Falha ao carregar os dados");
                setFilteredData([]);
            }
        }
    }

    return (
        <Box className="container" p={6}>
            {apiError && <Text color="red.600">Erro ao carregar o produto!</Text>}

            {product ? (
                <Flex direction={{ base: "column", md: "row" }} gap={8} align="start">
                    {/* Imagem do Produto */}
                    <Box flex="1">
                        <Image
                            src={product.image}
                            alt={product.name}
                            borderRadius="md"
                            objectFit="cover"
                            maxW={{ base: "100%", md: "600px" }} // Imagem maior
                            h={{ base: "auto", md: "500px" }}
                            boxShadow="lg"
                        />
                    </Box>

                    {/* Informações do Produto */}
                    <Box flex="1" border="1px solid #E2E8F0" p={5} borderRadius="md">
                        <Heading size="lg" color="red.600">{product.name}</Heading>
                        <Badge colorScheme="red" mt={2}>{product.category?.name}</Badge>
                        <Text fontSize="sm" color="gray.500" mt={2}><strong>Marca:</strong> {product.brand}</Text>
                        <Text color="gray.600" mt={2}>{product.description}</Text>

                        {/* Preço e Parcelamento */}
                        <Text mt={3} fontSize="lg" textDecoration="line-through" color="gray.500">
                            R$ {product.price.toFixed(2).replace(".", ",")}
                        </Text>
                        <Heading size="xl" color="red.600">
                            R$ {(product.price * 0.90).toFixed(2).replace(".", ",")}
                            <Text as="small" fontSize="md" fontWeight="normal" color="gray.600"> à vista</Text>
                        </Heading>
                        <Text mt={1} fontSize="md" color="gray.600">
                            ou R$ {product.price.toFixed(2).replace(".", ",")} em até 10x de R$ {installmentPrice}
                        </Text>

                        <Button colorScheme="red" mt={4} width="full">Adicionar ao Carrinho</Button>

                        {/* Simulador de Frete */}
                        <Box mt={6} p={4} bg="gray.100" borderRadius="md">
                            <Text fontSize="sm" fontWeight="bold">CEP (Apenas números)</Text>
                            <Flex mt={2} gap={3}>
                                <Input type="text" placeholder="Digite seu CEP" flex="1" />
                                <Button colorScheme="red">Calcular</Button>
                            </Flex>
                        </Box>
                    </Box>
                </Flex>
            ) : (
                <Text color="gray.600" textAlign="center">Carregando...</Text>
            )}

            {/* Detalhes do Produto */}
            {product && (
                <Box mt={10} p={5} bg="gray.50" borderRadius="md">
                    <Heading size="md">Detalhes do Produto</Heading>
                    <Divider my={3} />
                    <VStack align="start" spacing={3}>
                        <Heading size="sm">Ingredientes</Heading>
                        <Text>{product.ingredients}</Text>
                        <Text><strong>Quantidade:</strong> {product.quantity} mls</Text>
                        <Text color="red.700">{product.details}</Text>
                    </VStack>
                </Box>
            )}
            <SimpleGrid minChildWidth='sm' spacing='40px'>
                {filteredData.map(product => (
                    <Box key={product.id}>
                        <Cards product={product}></Cards>
                    </Box>
                ))}
            </SimpleGrid>
        </Box>
    );
}
