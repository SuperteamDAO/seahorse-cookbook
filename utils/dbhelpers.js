const tutorialDashBeginner = require("../content/TutorialDashboard/TutorialsDashboardBeginner.json");

const populateDB = () => {
	let beginnerModules = {};
	tutorialDashBeginner.map((module) => {
		let moduleName = module.title.split(" ").join("").toLowerCase();

		beginnerModules = { ...beginnerModules, [moduleName]: {} };

		for (let i = 0; i < module.pagecount; i++) {
			beginnerModules[moduleName][i + 1] = false;
		}
	});

	return { beginnerModules, intermediateModules: {}, advancedModules: {} };
};

export default populateDB;
