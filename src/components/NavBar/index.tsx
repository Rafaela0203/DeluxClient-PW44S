import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "@/assets/Delux.png";
import {
    Box,
    Flex,
    HStack,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
} from "@chakra-ui/react";
import { FaUser, FaSearch } from "react-icons/fa";
import { FaCartShopping, FaHeart } from "react-icons/fa6";
import "./index.css";
import AuthService from "@/service/AuthService.ts";

export function NavBar() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState(""); // Estado para armazenar o termo de busca

    const handleUserClick = () => {
        navigate("/login");
    };

    const onClickLogout = () => {
        AuthService.logout();
        navigate("/login");
    };

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <Flex id="nav-bar" zIndex={2} align="center" p={2} bg="red.100" boxShadow="sm" fontWeight="bold" color="red.600" position="relative">
            {/* LOGO */}
            <Box w="150px">
                <Link to="/">
                    <img src={logo} width="90px" alt="Delux" />
                </Link>
            </Box>

            {/* LINKS CENTRALIZADOS */}
            <HStack spacing={8} position="absolute" left="50%" transform="translateX(-50%)">
                <NavLink to="/" className="nav-link">HOME</NavLink>
                <NavLink to="/products" className="nav-link">PROMOS</NavLink>
                <NavLink to="/products" className="nav-link">PRODUTOS</NavLink>

                {/* MENU DE CATEGORIAS */}
                <Menu isOpen={isMenuOpen}>
                    <MenuButton
                        onMouseEnter={() => setIsMenuOpen(true)}
                        onMouseLeave={() => setIsMenuOpen(false)}
                    >
                        CATEGORIAS
                    </MenuButton>
                    <MenuList
                        onMouseEnter={() => setIsMenuOpen(true)}
                        onMouseLeave={() => setIsMenuOpen(false)}
                        zIndex="popover"
                    >
                        <MenuItem>Categoria 1</MenuItem>
                        <MenuItem>Categoria 2</MenuItem>
                        <MenuItem>Categoria 3</MenuItem>
                    </MenuList>
                </Menu>
            </HStack>

            {/* ÍCONES E BARRA DE PESQUISA */}
            <HStack spacing={4} ml="auto">
                <InputGroup>
                    <Input
                        type="search"
                        placeholder="Buscar produtos..."
                        focusBorderColor="red.200"
                        bg={"red.25"}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()} // Permite buscar pressionando Enter
                    />
                    <InputRightElement>
                        <IconButton
                            aria-label="Buscar"
                            icon={<FaSearch  />}
                            color="red.600"
                            variant="ghost"
                            onClick={handleSearch} // Chama a busca ao clicar no ícone
                        />
                    </InputRightElement>
                </InputGroup>

                <NavLink to="/cart">
                    <IconButton aria-label="Heart" icon={<FaHeart />} variant="ghost" color="red.600" />
                </NavLink>

                <NavLink to="/cart">
                    <IconButton aria-label="Cart" icon={<FaCartShopping />} variant="ghost" color="red.600" />
                </NavLink>

                {/* MENU DO USUÁRIO */}
                <Menu isOpen={isUserMenuOpen}>
                    <MenuButton
                        as={IconButton}
                        aria-label="User"
                        icon={<FaUser />}
                        variant="ghost"
                        color="red.600"
                        onMouseEnter={() => setIsUserMenuOpen(true)}
                        onMouseLeave={() => setIsUserMenuOpen(false)}
                        onClick={handleUserClick}
                    />
                    <MenuList
                        onMouseEnter={() => setIsUserMenuOpen(true)}
                        onMouseLeave={() => setIsUserMenuOpen(false)}
                        zIndex="popover"
                    >
                        <NavLink to="/profile" className="nav-link"><MenuItem>Perfil</MenuItem></NavLink>
                        <MenuItem>Favoritos</MenuItem>
                        <MenuItem>Endereços</MenuItem>
                        <MenuDivider />
                        <MenuItem onClick={onClickLogout}>Sair</MenuItem>
                    </MenuList>
                </Menu>
            </HStack>
        </Flex>
    );
}

export default NavBar;
