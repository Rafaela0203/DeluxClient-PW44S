import { useEffect, useState } from "react";
import { MenuList, MenuItem } from "@chakra-ui/react";
import CategoryService from "@/service/CategoryService";

export function CategoryDropdown({ onSelect }: { onSelect: (categoryId: number) => void }) {
    const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const categoriesData = await CategoryService.findAll();
            console.log("Resposta da API no Dropdown:", categoriesData); // 🚀 Deve mostrar um array de categorias

            if (categoriesData.length > 0) {
                setCategories(categoriesData);
            } else {
                setError(true);
            }
        } catch (error) {
            console.error("Erro ao carregar categorias:", error);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <MenuList><MenuItem>Carregando...</MenuItem></MenuList>;
    if (error) return <MenuList><MenuItem>Erro ao carregar categorias</MenuItem></MenuList>;

    return (
        <MenuList>
            {categories.length > 0 ? (
                categories.map((category) => (
                    <MenuItem key={category.id} onClick={() => onSelect(category.id)}>
                        {category.name}
                    </MenuItem>
                ))
            ) : (
                <MenuItem>Nenhuma categoria encontrada</MenuItem>
            )}
        </MenuList>
    );
}
