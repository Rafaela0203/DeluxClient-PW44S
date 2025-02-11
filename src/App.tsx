import {ChakraProvider} from "@chakra-ui/react";
import './App.css'
import { BaseRoutes } from './routes/BaseRoutes'
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";


export function App() {

  return (
    <>
      <ChakraProvider>
          <NavBar />
          <BaseRoutes />
          <Footer />
      </ChakraProvider>
    </>
  )
}
