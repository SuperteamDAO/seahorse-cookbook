import type { NextPage } from "next";
import Head from "next/head";
import Sidebar from "../components/Sidebar";

const Home: NextPage = () => {
	return (
		<div>
			<Head>
				<title>Seahorse Cookbook</title>
				<meta name="description" content="Everything Seahorse Lang" />
				<link rel="icon" href="/CookBookLogo.png" />
			</Head>
			<Sidebar />
		</div>
	);
};

export default Home;
