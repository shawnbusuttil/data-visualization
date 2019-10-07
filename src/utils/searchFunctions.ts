export function searchDataSetBy<T>(dataSet: T[], key: string, query: string): T[] {
	if (query === "") {
		return dataSet;
	}
	return dataSet.filter(item => item[key] === query);
}