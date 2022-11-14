import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Sidebar from "../../../components/Sidebar";
import CodeView from "../../../components/CodeView";

function ModulePage() {
	const [pageContent, setPageContent] = useState("");

	const { asPath } = useRouter();

	useEffect(() => {
		const splitPath = asPath.split("/").slice(-1)[0].split("_");
		const moduleName = splitPath[0];
		const pageNum = splitPath[1];

		import(
			`../../../content/BeginnerModules/${moduleName}/${pageNum}.md`
		).then((res) => {
			fetch(res.default)
				.then((response) => response.text())
				.then((response) => setPageContent(response))
				.catch((err) => console.log(err));
		});
	}, []);

	return (
		<Sidebar>
			<ReactMarkdown>{pageContent}</ReactMarkdown>
		</Sidebar>
	);
}

export default ModulePage;
