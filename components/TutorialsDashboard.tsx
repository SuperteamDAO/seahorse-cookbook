import { Heading, HStack, VStack } from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
	WalletModalProvider,
	WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import Connected from "./Connected";
import NotConnected from "./NotConnected";

require("@solana/wallet-adapter-react-ui/styles.css");

function TutorialsDashboard() {
	const wallet = useWallet();

	return (
		<VStack
			alignItems={"start"}
			bg={"gray.900"}
			minH="100vh"
			h="full"
			w="100%"
			spacing={16}
		>
			<HStack
				justifyContent={"space-between"}
				alignSelf={"start"}
				px={14}
				color={"#FB7185"}
				w="full"
				display={"flex"}
				flexDirection={{ base: "column", md: "row" }}
				mt={{ base: 4 }}
			>
				<Heading mt={{ base: 6, md: 0 }}>Tutorials Dashboard</Heading>
				<WalletModalProvider>
					<WalletMultiButton
						style={{
							borderRadius: 30,
							background: "#FB7185",
							color: "#171923",
						}}
					/>
				</WalletModalProvider>
			</HStack>
			{wallet.publicKey && <Connected />}
			{!wallet.publicKey && <NotConnected />}
		</VStack>
	);
}

export default TutorialsDashboard;
