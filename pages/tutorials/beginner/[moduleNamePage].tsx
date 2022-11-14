import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Sidebar from "../../../components/Sidebar";
import CodeView from "../../../components/CodeView";

function modulePage() {
	const [pageContent, setPageContent] = useState("");

	const { asPath } = useRouter();

	useEffect(() => {
		const splitPath = asPath.split("/").slice(-1)[0].split("_");
		const module = splitPath[0];
		const page = splitPath[1];

		import(`../../../content/BeginnerModules/${module}/${page}.md`).then(
			(res) => {
				fetch(res.default)
					.then((response) => response.text())
					.then((response) => setPageContent(response))
					.catch((err) => console.log(err));
			}
		);
	}, []);

	return (
		<Sidebar>
			<ReactMarkdown>{pageContent}</ReactMarkdown>
		</Sidebar>
	);
}

export default modulePage;
