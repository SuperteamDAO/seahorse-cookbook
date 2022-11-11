import { Text, VStack } from "@chakra-ui/react";

function NotConnected() {
	return (
		<VStack
			alignItems={"start"}
			spacing={5}
			px={14}
			fontSize={18}
			w={"80%"}
		>
			<Text>Welcome to Seahorse Tutorials!</Text>
			<Text>
				What is it and what can you expect out of these tutorials? Well
				as for one you will get to know more about Seahorse Lang.
			</Text>
			<Text>
				What is it? It is a framework built on top of Anchor Lang which
				ables you to write Solana programs in Python.
			</Text>
			<Text>
				If that gets you hyped, connect your wallet and let's go on a
				journey to learn Seahorse!
			</Text>
		</VStack>
	);
}

export default NotConnected;
