import {
	Box,
	CloseButton,
	Flex,
	Icon,
	useColorModeValue,
	Link,
	Drawer,
	DrawerContent,
	Text,
	useDisclosure,
	BoxProps,
	FlexProps,
	IconButton,
	HStack,
} from "@chakra-ui/react";
import { FiBook, FiBookOpen, FiPenTool, FiMenu } from "react-icons/fi";
import { IconType } from "react-icons";
import { ReactNode, ReactText } from "react";
import CookbookLogo from "../public/CookBookLogo.png";
import Image from "next/image";
import { useRouter } from "next/router";

interface LinkItemProps {
	name: string;
	icon: IconType;
	disabled: boolean;
	url: string;
}
const LinkItems: Array<LinkItemProps> = [
	{
		name: "Program Library",
		icon: FiBookOpen,
		disabled: false,
		url: "/programlibrary",
	},
	{ name: "Tutorials", icon: FiPenTool, disabled: false, url: "/tutorials" },
	{ name: "Content Aggregator", icon: FiBook, disabled: true, url: "/404" },
];

export default function Sidebar({ children }: { children: ReactNode }) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
			<SidebarContent
				onClose={() => onClose}
				display={{ base: "none", md: "block" }}
			/>
			<Drawer
				autoFocus={false}
				isOpen={isOpen}
				placement="left"
				onClose={onClose}
				returnFocusOnClose={false}
				onOverlayClick={onClose}
				size="full"
			>
				<DrawerContent>
					<SidebarContent onClose={onClose} />
				</DrawerContent>
			</Drawer>
			{/* mobilenav */}
			<MobileNav onOpen={onOpen} />
			<Box ml={{ base: 0, md: 80 }}>{children}</Box>
		</Box>
	);
}

interface SidebarProps extends BoxProps {
	onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
	const router = useRouter();
	return (
		<Box
			transition="3s ease"
			bg={useColorModeValue("white", "gray.900")}
			borderRight="1px"
			borderRightColor={useColorModeValue("gray.200", "gray.700")}
			w={{ base: "full", md: 80 }}
			pos="fixed"
			h="100%"
			{...rest}
		>
			<HStack>
				<Flex
					h="20"
					alignItems="center"
					ml="6"
					justifyContent="space-between"
					cursor="pointer"
					onClick={() => router.push("/")}
				>
					<Image
						src={CookbookLogo}
						height={30}
						width={30}
						style={{ borderRadius: 8, marginRight: 0 }}
					/>
					<Text
						fontSize="2xl"
						fontWeight="bold"
						color={"#FB7185"}
						ml={4}
					>
						Seahorse Cookbook
					</Text>
				</Flex>
				<CloseButton
					display={{ base: "flex", md: "none" }}
					onClick={onClose}
				/>
			</HStack>
			{LinkItems.map((link) => (
				<NavItem
					mt={4}
					key={link.name}
					icon={link.icon}
					linkDisabled={link.disabled}
					url={link.url}
				>
					{link.name}
				</NavItem>
			))}
		</Box>
	);
};

interface NavItemProps extends FlexProps {
	icon: IconType;
	children: ReactText;
	linkDisabled: boolean;
	url: string;
}
const NavItem = ({
	icon,
	url,
	linkDisabled,
	children,
	...rest
}: NavItemProps) => {
	const router = useRouter();

	return (
		<Link
			href="#"
			style={{ textDecoration: "none" }}
			_focus={{ boxShadow: "none" }}
		>
			<Flex
				align="center"
				p="4"
				mx="6"
				borderRadius="lg"
				role="group"
				onClick={() => {
					!linkDisabled && router.push(url);
				}}
				cursor={linkDisabled ? "not-allowed" : "pointer"}
				_hover={
					linkDisabled
						? {
								bg: "#4d586e",
								color: "#b5b5b5",
						  }
						: {
								bg: "#FB7185",
								color: "#171923",
						  }
				}
				{...rest}
			>
				{icon && (
					<Icon
						mr="4"
						fontSize="16"
						_groupHover={
							linkDisabled
								? { color: "#b5b5b5" }
								: { color: "#171923" }
						}
						as={icon}
					/>
				)}
				{children}
			</Flex>
		</Link>
	);
};

interface MobileProps extends FlexProps {
	onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
	return (
		<Flex
			ml={{ base: 0, md: 60 }}
			px={{ base: 4, md: 4 }}
			height="20"
			alignItems="center"
			justifyContent={{ base: "space-between", md: "flex-end" }}
			{...rest}
		>
			<IconButton
				display={{ base: "flex", md: "none" }}
				onClick={onOpen}
				variant="outline"
				aria-label="open menu"
				icon={<FiMenu />}
			/>

			<Text
				display={{ base: "flex", md: "none" }}
				fontSize="2xl"
				fontFamily="monospace"
				fontWeight="bold"
			>
				<Image
					src={CookbookLogo}
					height={40}
					width={40}
					style={{ borderRadius: 8 }}
				/>
			</Text>
		</Flex>
	);
};
