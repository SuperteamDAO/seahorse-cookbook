import {
	HStack,
	Heading,
	VStack,
	Text,
	SimpleGrid,
	Box,
	IconButton,
	Icon,
} from "@chakra-ui/react";
import { TfiNewWindow } from "react-icons/tfi";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { supabase } from "../lib/initSupabase";

interface ProgramRegistry {
	id: number;
	name: string;
	description: string;
	github_link: string;
	creator_twitter: string;
	indexed: boolean;
	created_at: any;
}

function ProgramLibrary() {
	const [programsRegistry, setProgramsRegistry] =
		useState<Array<ProgramRegistry>>();

	useEffect(() => {
		fetchProgramLibrary();
	}, []);

	const fetchProgramLibrary = async () => {
		let { data, error } = await supabase
			.from("program_collection_registry")
			.select("*")
			.order("created_at", { ascending: false })
			.eq("indexed", true);

		if (error) {
			console.log("error", error);
		} else {
			data && setProgramsRegistry(data);
		}
	};
	return (
		<HStack>
			<Sidebar />
			<VStack bg={"gray.900"} h="full" w="full">
				<Heading alignSelf={"start"} mt={10} ml={20} color={"#FB7185"}>
					Seahorse Program Library
				</Heading>
				<Box>
					<SimpleGrid
						columns={2}
						spacing={20}
						mt={20}
						mb={10}
						w={"70vw"}
					>
						{programsRegistry &&
							programsRegistry.map((registry) => (
								<Box
									key={registry.id}
									border={"1px"}
									borderRadius={8}
									borderColor={"#878787"}
									px={8}
									py={8}
									display="flex"
									flexDirection={"column"}
									justifyContent={"space-between"}
								>
									<HStack alignContent={"center"} mb={4}>
										<Text
											fontSize={28}
											fontWeight={"bold"}
											color="#FB7185"
											mr={2}
										>
											{registry.name}
										</Text>
										<a
											href={registry.github_link}
											target={"_blank"}
											rel="noopener noreferrer"
										>
											<TfiNewWindow
												fontSize={"22"}
												color={"#FB7185"}
											/>
										</a>
									</HStack>
									<Text color={"#878787"} mb={8}>
										{registry.description}
									</Text>
									<Text
										cursor="pointer"
										_hover={{
											color: "#4db2f7",
											textDecoration: "underline",
										}}
									>
										<a
											href={
												"https://twitter.com/" +
												registry.creator_twitter
											}
											target={"_blank"}
											rel="noopener noreferrer"
										>
											{registry.creator_twitter}
										</a>
									</Text>
								</Box>
							))}
					</SimpleGrid>
				</Box>
			</VStack>
		</HStack>
	);
}

export default ProgramLibrary;