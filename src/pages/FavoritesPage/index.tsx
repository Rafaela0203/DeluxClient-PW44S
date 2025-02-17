import { useEffect, useState } from "react";
import { IProduct } from "@/commons/interfaces";
import { SimpleGrid, Box, Heading } from "@chakra-ui/react";
import { Cards } from "@/components/Card";

export function FavoritesPage() {
    const [favorites, setFavorites] = useState<IProduct[]>([]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
        setFavorites(storedFavorites);
    }, []);

    return (
        <Box className="container" mt="5">
            <Heading textAlign="center" mb="5" color="red.600">
                Meus Favoritos
            </Heading>
            {favorites.length > 0 ? (
                <SimpleGrid columns={[1, 2, 3]} spacing={4}>
                    {favorites.map((product) => (
                        <Cards key={product.id} product={product} />
                    ))}
                </SimpleGrid>
            ) : (
                <Heading size="md" textAlign="center" color="gray.500">
                    Nenhum produto favoritado.
                </Heading>
            )}
        </Box>
    );
}