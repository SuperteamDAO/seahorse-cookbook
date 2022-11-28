import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Sidebar from "../../../components/Sidebar";
import rehypeRaw from "rehype-raw";
import { NextPage } from "next";

const ModulePage: NextPage = () => {
	const [pageContent, setPageContent] = useState("");

	const router = useRouter();

	useEffect(() => {
		if (router.isReady) {
			const splitPath: string = router.query?.moduleNamePage?.split("_");
			const moduleName: string = splitPath[0];
			const pageNum: string = splitPath[1];

			const importMD = async (moduleName: string, pageNum: string) => {
				const file = await import(
					// add !!html-loader!markdown-loader! at the beginning
					`../../../content/BeginnerModules/${moduleName}/${pageNum}.md`
				);
				console.log(file);
				// const response = await fetch(file.default);
				// const text = await file.text();
				console.log(file.default);
				setPageContent(file.default);
			};

			importMD(moduleName, pageNum);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router]);

	return (
		<Sidebar>
			<ReactMarkdown rehypePlugins={[rehypeRaw]}>
				{pageContent}
			</ReactMarkdown>
		</Sidebar>
	);
};

export default ModulePage;
