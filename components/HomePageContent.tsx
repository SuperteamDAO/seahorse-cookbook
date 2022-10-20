import { Box, Heading, Link, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

function HomePageContent() {
	const router = useRouter();
	return (
		<VStack alignItems={"start"} ml={10}>
			<Heading color={"#FB7185"} mb={10}>
				Welcome to Seahorse Cookbook
			</Heading>
			<VStack alignItems={"start"} spacing={10}>
				<Text w={"70%"} fontSize={18}>
					The Seahorse Cookbook is a culmination of developer
					resources, interactive tutorials and program libraries that
					provides the essential concepts and references for building
					applications on Solana with Seahorse Lang.
				</Text>
				<Text w={"70%"} fontSize={18}>
					Head over to the{" "}
					<Box
						as="span"
						onClick={() => router.push("/programlibrary")}
						color="#FB7185"
						cursor={"pointer"}
						_hover={{
							textDecoration: "underline",
						}}
					>
						Seahorse Program Library
					</Box>{" "}
					to check out open source example programs written in
					Seahorse!
				</Text>
			</VStack>
		</VStack>
	);
}

export default HomePageContent;
