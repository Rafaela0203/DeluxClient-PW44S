import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "@/assets/Delux.png";
import AuthService from "@/service/AuthService";
import {Box, Flex, HStack, IconButton, Spacer} from "@chakra-ui/react";
import {FaUser, FaSearch} from "react-icons/fa";
import {FaCartShopping} from "react-icons/fa6";
import './index.css';
export function NavBar() {
  const navigate = useNavigate();

  return (
      <Flex id='nav-bar' align="center" p={2} bg="red.100" boxShadow="sm" fontWeight='bold' color='red.600'>
        {/* Logo */}
        <Box w='150px'>
          <Link to="/">
            <img src={logo} width="90px" alt="Delux" />
          </Link>
        </Box>

        <Spacer />

        {/* Navegação */}
        <HStack spacing={6}>
          <NavLink to="/" className="nav-link">
            HOME
          </NavLink>
          <NavLink to="/products" className="nav-link">
              PRODUTOS
          </NavLink>
          <NavLink to="/categories" className="nav-link">
              CATEGORIAS
          </NavLink>
        </HStack>

        <Spacer />

        {/* Ícones de ação */}
        <HStack spacing={4} >
          <IconButton aria-label="Search" icon={<FaSearch />} variant="ghost" color='red.600'/>
            <NavLink to="/cart" className="nav-link">
                <IconButton aria-label="Cart" icon={<FaCartShopping />} variant="ghost" color='red.600'/>
            </NavLink>
            <NavLink to="/signup" className="nav-link">
                <IconButton aria-label="User" icon={<FaUser />} variant="ghost" color='red.600'/>
            </NavLink>
        </HStack>
      </Flex>
  );
}

export default NavBar;
