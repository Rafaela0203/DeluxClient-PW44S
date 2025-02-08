import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "@/assets/Delux.png";
import {
    Box,
    Flex,
    HStack,
    IconButton, Input, InputGroup, InputRightElement,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
} from "@chakra-ui/react";
import { FaUser, FaSearch } from "react-icons/fa";
import { FaCartShopping, FaHeart } from "react-icons/fa6";
import './index.css';

export function NavBar() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // Controle do menu do usuário

    const handleUserClick = () => {
        navigate("/login"); // Redireciona para login ao clicar
    };

    return (
        <Flex id='nav-bar' zIndex={2} align="center" p={2} bg="red.100" boxShadow="sm" fontWeight='bold' color='red.600' position="relative">

            {/* LOGO */}
            <Box w='150px'>
                <Link to="/">
                    <img src={logo} width="90px" alt="Delux"/>
                </Link>
            </Box>

            {/* LINKS CENTRALIZADOS */}
            <HStack spacing={8} position="absolute" left="50%" transform="translateX(-50%)">
                <NavLink to="/" className="nav-link">HOME</NavLink>
                <NavLink to="/products" className="nav-link">PROMOS</NavLink>
                <NavLink to="/products" className="nav-link">PRODUTOS</NavLink>

                {/* MENU DE CATEGORIAS QUE ABRE AO PASSAR O MOUSE */}
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
                        <MenuItem>Meus Pedidos</MenuItem>
                        <MenuItem>Endereços</MenuItem>
                        <MenuItem>Sair</MenuItem>
                    </MenuList>
                </Menu>
            </HStack>

            {/* ÍCONES E BARRA DE PESQUISA */}
            <HStack spacing={4} ml="auto">
                <InputGroup>
                    <InputRightElement pointerEvents='none'>
                        <FaSearch color='red.300' />
                    </InputRightElement>
                    <Input type='search' focusBorderColor='red.200' bg={"red.25"} />
                </InputGroup>

                <NavLink to="/cart">
                    <IconButton aria-label="Cart" icon={<FaHeart />} variant="ghost" color='red.600' />
                </NavLink>

                <NavLink to="/cart">
                    <IconButton aria-label="Cart" icon={<FaCartShopping />} variant="ghost" color='red.600' />
                </NavLink>

                {/* MENU DO USUÁRIO QUE ABRE AO PASSAR O MOUSE */}
                <Menu isOpen={isUserMenuOpen}>
                    <MenuButton
                        as={IconButton}
                        aria-label="User"
                        icon={<FaUser />}
                        variant="ghost"
                        color="red.600"
                        onMouseEnter={() => setIsUserMenuOpen(true)}
                        onMouseLeave={() => setIsUserMenuOpen(false)}
                        onClick={handleUserClick} // Redireciona para login ao clicar
                    />
                    <MenuList
                        onMouseEnter={() => setIsUserMenuOpen(true)}
                        onMouseLeave={() => setIsUserMenuOpen(false)}
                        zIndex="popover"
                    >
                        <MenuItem><NavLink to="/profile" className="nav-link">Perfil</NavLink></MenuItem>
                        <MenuItem>Meus Pedidos</MenuItem>
                        <MenuItem>Endereços</MenuItem>
                        <MenuDivider />
                        <MenuItem>Sair</MenuItem>
                    </MenuList>
                </Menu>
            </HStack>
        </Flex>
    );
}

export default NavBar;
