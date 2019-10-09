import { searchDataSetBy } from "./searchFunctions";

describe("searchFunc", () => {
	it("should return nothing if the query is empty", () => {
		const results = searchDataSetBy([
			{ name: "ice-cream" },
			{ name: "waffle" }
		],
		"name",
		"");
		expect(results).toEqual([
			{ name: "ice-cream" },
			{ name: "waffle" }
		]);
	});

	it("should return the correct results", () => {
		const results = searchDataSetBy([
			{ name: "ice-cream" },
			{ name: "waffle" }
		],
		"name",
		"ice-cream");
		expect(results).toEqual([{ name: "ice-cream" }]);
	});
});