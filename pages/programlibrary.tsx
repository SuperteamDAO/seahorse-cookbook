import Head from "next/head";
import Sidebar from "../components/Sidebar";
import ProgramLibraryContent from "../components/ProgramLibraryContent";
import { NextPage } from "next";

const ProgramLibrary: NextPage = () => {
	return (
		<div>
			<Head>
				<title>Seahorse Cookbook</title>
				<meta name="description" content="Everything Seahorse Lang" />
				<link rel="icon" href="/CookBookLogo.png" />
			</Head>
			<Sidebar>
				<ProgramLibraryContent />
			</Sidebar>
		</div>
	);
};

export default ProgramLibrary;
