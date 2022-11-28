import {
	ConnectionProvider,
	WalletProvider,
} from "@solana/wallet-adapter-react";
import {
	PhantomWalletAdapter,
	SolflareWalletAdapter,
	GlowWalletAdapter,
	BackpackWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from "@solana/web3.js";
import { useMemo } from "react";
import Head from "next/head";
import Sidebar from "../../components/Sidebar";
import TutorialsDashboard from "../../components/TutorialsDashboard";
import { NextPage } from "next";

const Tutorials: NextPage = () => {
	const network = WalletAdapterNetwork.Mainnet;

	const endpoint = useMemo(() => clusterApiUrl(network), [network]);

	const wallets = useMemo(
		() => [
			new PhantomWalletAdapter(),
			new SolflareWalletAdapter({ network }),
			new GlowWalletAdapter(),
			new BackpackWalletAdapter(),
		],
		[network]
	);

	return (
		<div>
			<Head>
				<title>Seahorse Cookbook</title>
				<meta name="description" content="Everything Seahorse Lang" />
				<link rel="icon" href="/CookBookLogo.png" />
			</Head>
			<Sidebar>
				<ConnectionProvider endpoint={endpoint}>
					<WalletProvider wallets={wallets} autoConnect>
						<TutorialsDashboard />
					</WalletProvider>
				</ConnectionProvider>
			</Sidebar>
		</div>
	);
};

export default Tutorials;
