import { useState } from "react";
import { useToast, IconButton } from "@chakra-ui/react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IProduct } from "@/commons/interfaces.ts";
import { useNavigate } from "react-router-dom";
import AuthService from "@/service/AuthService";

export function AddToFavorites({ product }: { product: IProduct }) {
    const navigate = useNavigate();
    const toast = useToast();

    // Verifica se o produto já está nos favoritos ao carregar
    const [isFavorite, setIsFavorite] = useState(() => {
        const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
        return favorites.some((item: IProduct) => item.id === product.id);
    });

    const handleFavorites = () => {
        if (AuthService.isAuthenticated()) {
            // Usuário autenticado -> Pode adicionar/remover dos favoritos
            let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

            if (isFavorite) {
                favorites = favorites.filter((item: IProduct) => item.id !== product.id);
                toast({
                    title: "Removido dos Favoritos",
                    description: "O produto foi removido da sua lista de favoritos.",
                    status: "info",
                    duration: 3000,
                    isClosable: true,
                    position: "top-right",
                });
            } else {
                favorites.push(product);
                toast({
                    title: "Adicionado aos Favoritos",
                    description: "O produto foi salvo na sua lista de favoritos.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                    position: "top-right",
                });
            }

            localStorage.setItem("favorites", JSON.stringify(favorites));
            setIsFavorite(!isFavorite);
        } else {
            // Usuário não autenticado -> Redireciona para login antes de favoritar
            localStorage.setItem("redirectAfterLogin", window.location.pathname);
            navigate("/login");
        }
    };

    return (
        <IconButton
            aria-label="Adicionar aos favoritos"
            icon={isFavorite ? <FaHeart color="red" /> : <FaRegHeart />}
            position="absolute"
            top="5px"
            right="5px"
            bg="white"
            borderRadius="full"
            onClick={handleFavorites}
            _hover={{ bg: "gray.100" }}
        />
    );
}