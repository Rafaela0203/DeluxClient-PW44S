import {ChakraProvider} from "@chakra-ui/react";
import './App.css'
import { BaseRoutes } from './routes/BaseRoutes'
import NavBar from "@/components/NavBar";


export function App() {

  return (
    <>
      <ChakraProvider>
          <NavBar />
          <BaseRoutes />
      </ChakraProvider>
    </>
  )
}
