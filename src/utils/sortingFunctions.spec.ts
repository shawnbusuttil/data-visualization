import { sort } from "./sortingFunctions";

describe("sortFunc", () => {
	it("should sort correctly under normal conditions", () => {
		const results = sort([
				{ name: "ice-cream" },
				{ name: "waffle" }
			],
			"name",
			true
		);
		expect(results).toEqual([
			{ name: "waffle" },
			{ name: "ice-cream" }
		]);
	});

	it("should sort correctly under date of birth conditions", () => {
		const results = sort([
				{ date_of_birth: "1/1/1991" },
				{ date_of_birth: "1/1/1992" }
			],
			"date_of_birth",
			true
		);
		expect(results).toEqual([
			{ date_of_birth: "1/1/1992" },
			{ date_of_birth: "1/1/1991" }
		]);
	});
});