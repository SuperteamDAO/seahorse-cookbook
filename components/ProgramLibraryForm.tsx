import {
	Button,
	FormControl,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Textarea,
	useToast,
	VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { supabase } from "../lib/initSupabase";

type ProgramLibraryProps = {
	onClose: () => void;
	isOpen: boolean;
};

function ProgramLibraryForm({ onClose, isOpen }: ProgramLibraryProps) {
	const [libraryFormName, setLibraryFormName] = useState<string>("");
	const [libraryFormDescription, setLibraryFormDescription] =
		useState<string>("");
	const [libraryFormGithub, setLibraryFormGithub] = useState<string>("");
	const [libraryFormTwitter, setLibraryFormTwitter] = useState<string>("");
	const [libraryFormTags, setLibraryFormTags] = useState<string>("");

	const toast = useToast();

	const handleSubmitForm = async () => {
		const searchTags = libraryFormTags.split(",").slice(0, 5);
		searchTags.push(libraryFormTwitter);

		searchTags.forEach((tag, i) => {
			searchTags[i] = tag.trim();
		});

		const values = {
			name: libraryFormName,
			description: libraryFormDescription,
			github_link: libraryFormGithub,
			creator_twitter: libraryFormTwitter,
			indexed: false,
			created_at: new Date().toISOString(),
			search_tags: searchTags,
		};

		try {
			if (
				libraryFormName == "" ||
				libraryFormDescription == "" ||
				libraryFormGithub == "" ||
				libraryFormTwitter == "" ||
				libraryFormTags == ""
			) {
				throw new Error("A required value is missing");
			}

			let { error } = await supabase
				.from("program_collection_registry")
				.insert(values);

			if (error) {
				throw error;
			}

			toast({
				title: "Success",
				description:
					"Check back in a few days to see your program in the library!",
				status: "success",
				duration: 9000,
				isClosable: true,
			});

			setLibraryFormName("");
			setLibraryFormDescription("");
			setLibraryFormGithub("");
			setLibraryFormTwitter("");
			setLibraryFormTags("");

			onClose();
		} catch (e: any) {
			toast({
				title: "We encountered an error",
				description: e.message,
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		}
	};

	return (
		<Modal
			closeOnOverlayClick={false}
			onClose={onClose}
			size={"xl"}
			isOpen={isOpen}
			scrollBehavior={"inside"}
			isCentered
			closeOnEsc={false}
		>
			<ModalOverlay />
			<ModalContent bgColor={"gray.900"} px={4} py={4}>
				<ModalHeader fontSize={24}>
					Add a Program to the Library
				</ModalHeader>
				<ModalCloseButton mr={6} mt={6} />
				<ModalBody>
					<VStack w="full" alignItems={"start"} spacing={5}>
						<FormControl isRequired>
							<FormLabel>Name</FormLabel>
							<Input
								required
								placeholder="seahorse-voting"
								focusBorderColor="#FB7185"
								value={libraryFormName as string}
								onChange={(e) => {
									setLibraryFormName(e.target.value);
								}}
							/>
						</FormControl>
						<FormControl isRequired>
							<FormLabel>Description</FormLabel>
							<Textarea
								required
								placeholder="Basic voting application on Seahorse"
								focusBorderColor="#FB7185"
								value={libraryFormDescription as string}
								onChange={(e) => {
									setLibraryFormDescription(e.target.value);
								}}
							/>
						</FormControl>
						<FormControl isRequired>
							<FormLabel>Github Link</FormLabel>
							<Input
								required
								placeholder="https://github.com/ameliatastic/seahorse-lang"
								focusBorderColor="#FB7185"
								value={libraryFormGithub as string}
								onChange={(e) =>
									setLibraryFormGithub(e.target.value)
								}
							/>
						</FormControl>
						<FormControl isRequired>
							<FormLabel>Creator Twitter</FormLabel>
							<Input
								required
								placeholder="ameliatastic"
								focusBorderColor="#FB7185"
								value={libraryFormTwitter as string}
								onChange={(e) =>
									setLibraryFormTwitter(e.target.value)
								}
							/>
						</FormControl>
						<FormControl isRequired>
							<FormLabel>Tags</FormLabel>
							<Textarea
								required
								placeholder="voting, governance, beginner (Make sure they are comma seperated. At most 5 tags)"
								focusBorderColor="#FB7185"
								value={libraryFormTags as string}
								onChange={(e) =>
									setLibraryFormTags(e.target.value)
								}
							/>
						</FormControl>
					</VStack>
				</ModalBody>
				<ModalFooter pt={4}>
					<Button
						type="submit"
						bgColor={"#FB7185"}
						onClick={handleSubmitForm}
						_hover={{ bgColor: "#ad3749" }}
					>
						Submit
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}

export default ProgramLibraryForm;
