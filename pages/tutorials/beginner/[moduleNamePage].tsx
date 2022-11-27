import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Sidebar from "../../../components/Sidebar";

function ModulePage() {
	const [pageContent, setPageContent] = useState("");

	const router = useRouter();

	useEffect(() => {
		if (router.isReady) {
			const splitPath: string = router.query?.moduleNamePage?.split("_");
			const moduleName: string = splitPath[0];
			const pageNum: string = splitPath[1];

			import(
				// add !!html-loader!markdown-loader! at the beginning
				`../../../content/BeginnerModules/${moduleName}/${pageNum}.md`
			).then((res) => {
				fetch(res.default)
					.then((response) => {
						console.log(response);
						return response.text();
					})
					.then((response) => setPageContent(response))
					.catch((err) => console.log("Error: ", err));
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router]);

	return (
		<Sidebar>
			<ReactMarkdown>{pageContent}</ReactMarkdown>
		</Sidebar>
	);
}

export default ModulePage;
