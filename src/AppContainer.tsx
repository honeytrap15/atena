import * as React from 'react'
import { ChakraProvider } from "@chakra-ui/react"


interface Props {
    children: any
}

const AppContainer = function (props: Props) {
    return <ChakraProvider>{props.children}</ChakraProvider>;
}

export default AppContainer;
