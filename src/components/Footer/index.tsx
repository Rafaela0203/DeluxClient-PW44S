import { Box, Flex, Text, VStack, HStack, Link, Icon } from "@chakra-ui/react";
import { FaFacebook, FaLinkedin, FaYoutube, FaInstagram } from "react-icons/fa";
import logo from "@/assets/Logotipo Delux.png";
import mastercard from "@/assets/mastercard.png";
import visa from "@/assets/visa.png";
import boleto from "@/assets/boleto.png";
import pix from "@/assets/pix.png";
import "./index.css";

export function Footer() {
    return (
        <Box className="footer" bg="red.100" color="red.600" py={5} px={10}>
            <Flex direction={{ base: "column", md: "row" }} justify="space-evenly" align="center">
                {/* Logotipo */}
                <Box w="180px">
                    <img src={logo} width="180px" alt="Logotipo Delux" />
                </Box>

                {/* Dados da Empresa */}
                <VStack align="start" spacing={1}>
                    <Text fontWeight="bold">Dados da Empresa</Text>
                    <Text>CNPJ: 46.314.100/0001-93</Text>
                    <Text>Inscrição Estadual: 934.86055-15</Text>
                    <Text>Endereço: Rua Luiz Detonni, 745, Fraron, Pato Branco - PR</Text>
                    <Text>Email: delux@gmail.com.br</Text>
                </VStack>

                {/* Institucional */}
                <VStack align="start" spacing={1}>
                    <Text fontWeight="bold">Institucional</Text>
                    <Link href="#">Dúvidas</Link>
                    <Link href="#">Sobre</Link>
                    <Link href="#">Termo de uso</Link>
                    <Link href="#">Política de privacidade</Link>
                </VStack>

                {/* Formas de Pagamento */}
                <VStack align="start" spacing={1}>
                    <Text fontWeight="bold">Formas de Pagamento</Text>
                    <HStack spacing={3}>
                        <img src={mastercard} width="40px" alt="Mastercard" />
                        <img src={visa} width="40px" alt="Visa" />
                        <img src={boleto} width="40px" alt="Boleto" />
                        <img src={pix} width="40px" alt="Pix" />
                    </HStack>
                </VStack>

                {/* Redes Sociais */}
                <VStack align="start" spacing={1}>
                    <Text fontWeight="bold">Redes Sociais</Text>
                    <HStack spacing={3}>
                        <Link href="#" isExternal>
                            <Icon as={FaFacebook} boxSize="24px" />
                        </Link>
                        <Link href="#" isExternal>
                            <Icon as={FaLinkedin} boxSize="24px" />
                        </Link>
                        <Link href="#" isExternal>
                            <Icon as={FaYoutube} boxSize="24px" />
                        </Link>
                        <Link href="#" isExternal>
                            <Icon as={FaInstagram} boxSize="24px" />
                        </Link>
                    </HStack>
                </VStack>
            </Flex>
        </Box>
    );
}

export default Footer;
