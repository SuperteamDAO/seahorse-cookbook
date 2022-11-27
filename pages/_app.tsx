import "../styles/globals.css";
import type { AppProps } from "next/app";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "../utils/theme";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
	const [showChild, setShowChild] = useState(false);

	useEffect(() => {
		setShowChild(true);
	}, []);

	if (!showChild) {
		return null;
	}

	return (
		<ChakraProvider theme={theme}>
			<Component {...pageProps} />
		</ChakraProvider>
	);
}

export default MyApp;
