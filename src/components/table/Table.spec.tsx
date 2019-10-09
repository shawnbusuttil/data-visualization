import React from "react";
import { mount } from "enzyme";

import Table from "./Table";
import { PROFILES_MOCK } from "../../testing/profile.mock";

describe("Table", () => {
	let component: any;

    let tableProps = {
		data: [PROFILES_MOCK],
		columns: ["id", "first_name"] 
    };

	beforeEach(() => {
		component = mount(<Table {...tableProps} />);
	});

	it("renders the component", () => {
		expect(component).toBeTruthy();
    });

    it("should have the columns rendered", () => {
        const cols = component.find("th");
        expect(cols.length).toBe(2);
	});

    it("should have the columns rendered", () => {
        const cells = component.find("tr");
        expect(cells.length).toBe(2);
	});

    afterEach(() => component.unmount());
});