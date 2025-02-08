import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "@/assets/Delux.png";
import {
    Box, Button,
    Flex,
    HStack, Icon,
    IconButton, Input, InputGroup, InputLeftElement, InputRightElement,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Spacer, Stack
} from "@chakra-ui/react";
import {FaUser, FaSearch} from "react-icons/fa";
import {FaCartShopping} from "react-icons/fa6";
import './index.css';
import React from "react";
import {CheckIcon} from "@chakra-ui/react/dist/types/stepper/icons";
export function NavBar() {
  const navigate = useNavigate();

    return (
        <Flex id='nav-bar' align="center" p={2} bg="red.100" boxShadow="sm" fontWeight='bold' color='red.600'>
            {/* Logo */}
            <Box w='150px'>
                <Link to="/">
                    <img src={logo} width="90px" alt="Delux"/>
                </Link>
            </Box>

            <Spacer/>

            {/* Navegação */}
            <HStack spacing={6}>
                <NavLink to="/" className="nav-link">
                    HOME
                </NavLink>
                <NavLink to="/products" className="nav-link">
                    PRODUTOS
                </NavLink>

                <Menu>
                    <MenuButton>
                        CATEGORIAS //FAZER FILTRO DE CATEGORIAS BASEADO NO IMPORT DO BANCO
                    </MenuButton>
                    <MenuList>
                        <MenuItem></MenuItem>
                        <MenuItem>Meus Pedidos</MenuItem>
                        <MenuItem>Endereços</MenuItem>
                        <MenuItem>Sair</MenuItem>
                    </MenuList>
                </Menu>
            </HStack>

            <Spacer/>

            {/* Ícones de ação */}
            <HStack spacing={4}>
                <Stack spacing={4}>
                    <InputGroup>
                        <InputRightElement pointerEvents='none'>
                            <FaSearch color='red.300' />
                        </InputRightElement>
                        <Input type='search' placeholder='O que deseja?' focusBorderColor='red.200' bg={"red.25"} />
                    </InputGroup>
                </Stack>

                <NavLink to="/cart" className="nav-link">
                    <IconButton aria-label="Cart" icon={<FaCartShopping/>} variant="ghost" color='red.600'/>
                </NavLink>
                <Menu>
                    <MenuButton
                        as={IconButton}
                        aria-label="User"
                        icon={<FaUser/>}
                        variant="ghost"
                        color='red.600'
                    >

                    </MenuButton>
                    <MenuList>
                        <MenuItem>Perfil</MenuItem>
                        <MenuItem>Meus Pedidos</MenuItem>
                        <MenuItem>Endereços</MenuItem>
                        <MenuDivider/>
                        <MenuItem>Sair</MenuItem>
                    </MenuList>
                </Menu>
            </HStack>
        </Flex>
    );
}

export default NavBar;
