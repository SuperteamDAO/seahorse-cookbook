import { useEffect, useState } from "react";
import {
	HStack,
	Heading,
	VStack,
	Text,
	SimpleGrid,
	Box,
	Link,
	InputGroup,
	InputLeftElement,
	Input,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { supabase } from "../lib/initSupabase";
import { BounceLoader } from "react-spinners";
import { TfiNewWindow } from "react-icons/tfi";
import getSearchResults from "../utils/search";
// import getProgramLibrarySearchResult from "../utils/search";

interface ProgramRegistry {
	id: number;
	name: string;
	description: string;
	github_link: string;
	creator_twitter: string;
	indexed: boolean;
	created_at: any;
	search_tags: Array<string>;
}

function ProgramLibraryContent() {
	const [programsRegistry, setProgramsRegistry] =
		useState<Array<ProgramRegistry>>();
	const [searchInput, setSearchInput] = useState<string>("");

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

	const handleSearch = (e: any) => {
		setSearchInput(e.target.value);

		programsRegistry && getSearchResults(searchInput, programsRegistry);
	};

	return (
		<VStack bg={"gray.900"} minH="100vh" h="full" w="100%">
			<Box
				justifyContent={"space-between"}
				alignSelf={"start"}
				px={14}
				color={"#FB7185"}
				w="full"
				display={"flex"}
				flexDirection={{ base: "column", md: "row" }}
				mt={{ base: 4 }}
			>
				<Heading mt={{ base: 6, md: 0 }}>
					Seahorse Program Library
				</Heading>
				<InputGroup w={"100"} mt={{ base: 4, md: 0 }}>
					<InputLeftElement pointerEvents="none">
						<SearchIcon color="gray.300" />
					</InputLeftElement>
					<Input
						type="text"
						placeholder="Search"
						focusBorderColor={"#FB7185"}
						color={"gray.400"}
						borderRadius={10}
						value={searchInput}
						onChange={(e) => {
							handleSearch(e);
						}}
					/>
				</InputGroup>
			</Box>
			<Text alignSelf={"start"} pl={14} pt={4} color="gray.400">
				The Seahorse Program Library is a collection of Solana programs
				written in{" "}
				<Link
					href={"https://seahorse-lang.org/"}
					target={"_blank"}
					rel="noopener noreferrer"
					style={{ textDecoration: "underline" }}
					_hover={{ color: "#FB7185" }}
				>
					Seahorse Lang
				</Link>
			</Text>
			<Box>
				{!programsRegistry && (
					<VStack mt={20}>
						<BounceLoader color="#FB7185" />
					</VStack>
				)}
				<SimpleGrid
					columns={{ base: 1, md: 2 }}
					spacing={20}
					mt={{ base: 10, md: 20 }}
					mb={20}
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
								<Text cursor="pointer">
									<Link
										href={
											"https://twitter.com/" +
											registry.creator_twitter
										}
										target={"_blank"}
										rel="noopener noreferrer"
										_hover={{
											color: "#4db2f7",
											textDecoration: "underline",
										}}
									>
										{registry.creator_twitter}
									</Link>
								</Text>
							</Box>
						))}
				</SimpleGrid>
			</Box>
		</VStack>
	);
}

export default ProgramLibraryContent;
