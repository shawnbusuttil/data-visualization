import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { Provider } from "react-redux";
import { createMockStore } from "redux-test-utils";
import { Pagination, Search } from "semantic-ui-react";

import DataTable from "./DataTable";
import Table from "../../components/table/Table";

import { PROFILES_MOCK } from "../../testing/profile.mock";
import { Store } from "redux";

const mockState = {
	profileState: { profiles: PROFILES_MOCK }
};

describe("DataTable", () => {
	let store: Store;
	let container: ReactWrapper;

	beforeEach(() => {
		store = createMockStore(mockState) as any;
		container = mount(
			<Provider store={store as any}>
				<DataTable />
			</Provider>
		);
	});

	it("renders the component", () => {
		expect(container).toBeTruthy();
	});

	it("renders the table with the correct props", () => {
		const table = container.find(Table);
		expect(table.length).toBe(1);
		expect(table.props().data).toEqual(PROFILES_MOCK);
	});

	it("renders the pagination", () => {
		const pgn = container.find(Pagination);
		expect(pgn.length).toBe(1);
	});

	it("renders the search", () => {
		const search = container.find(Search);
		expect(search.length).toBe(1);
	});

	it("renders the sort", () => {
		const sort = container.find(".sortBy");
		expect(sort.length).toBe(1);
	});

	afterEach(() => container.unmount());
});
