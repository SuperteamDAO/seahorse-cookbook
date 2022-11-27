// TODO: change search algorithm

const getDistance = (str1 = "", str2 = "") => {
	const track = Array(str2.length + 1)
		.fill(null)
		.map(() => Array(str1.length + 1).fill(null));
	for (let i = 0; i <= str1.length; i += 1) {
		track[0][i] = i;
	}
	for (let j = 0; j <= str2.length; j += 1) {
		track[j][0] = j;
	}
	for (let j = 1; j <= str2.length; j += 1) {
		for (let i = 1; i <= str1.length; i += 1) {
			const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
			track[j][i] = Math.min(
				track[j][i - 1] + 1, // deletion
				track[j - 1][i] + 1, // insertion
				track[j - 1][i - 1] + indicator // substitution
			);
		}
	}
	return track[str2.length][str1.length];
};

function sort(dataset: Array<any>, arr: Array<number>) {
	const len = arr.length;
	let checked;
	do {
		checked = false;
		for (let i = 0; i < len; i++) {
			if (arr[i] > arr[i + 1]) {
				let tmp1 = arr[i];
				arr[i] = arr[i + 1];
				arr[i + 1] = tmp1;

				let tmp2 = dataset[i];
				dataset[i] = dataset[i + 1];
				dataset[i + 1] = tmp2;

				checked = true;
			}
		}
	} while (checked);
	return dataset;
}

function getSearchResults(input: string, dataset: Array<any>) {
	const len = dataset.length;
	var arr = new Array(len);
	for (let i = 0; i < len; i += 1) {
		const dist = getDistance(input, dataset[i].name);
		arr[i] = dist;
	}

	return sort(dataset, arr);
}

export default getSearchResults;
