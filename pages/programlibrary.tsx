import Head from "next/head";
import Sidebar from "../components/Sidebar";
import ProgramLibraryContent from "../components/ProgramLibraryContent";

function ProgramLibrary() {
	return (
		<div>
			<Head>
				<title>Seahorse Cookbook</title>
				<meta name="description" content="Everything Seahorse Lang" />
				<link rel="icon" href="/CookBookLogo.png" />
			</Head>
			<Sidebar children={<ProgramLibraryContent />} />
		</div>
	);
}

export default ProgramLibrary;
