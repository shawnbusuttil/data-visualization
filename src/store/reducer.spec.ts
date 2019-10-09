import reducer from "./reducer";
import { PROFILE_ACTIONS } from "./actions";

import { PROFILES_MOCK } from "../testing/profile.mock";

describe("Profile Reducer", () => {
	const INITIAL_STATE = { profiles: [] };

    it("should return the initial state", () => {
        const state = reducer(INITIAL_STATE, { type: "" });
        expect(state).toEqual(INITIAL_STATE);
    });

    it("should handle fetchProfilesSuccess", () => {
        const state = reducer(INITIAL_STATE, { 
			type: PROFILE_ACTIONS.fetchProfilesSuccess,
			payload: PROFILES_MOCK
		});
        state.profiles.map((item, i) => expect(item.id).toBe(i));
	});

    it("should handle fetchProfilesFail", () => {
        const state = reducer(INITIAL_STATE, { 
			type: PROFILE_ACTIONS.fetchProfilesFail,
			payload: new Error("something")
		});
		expect(state.profiles).toEqual([]);
		expect(state.error).toEqual(new Error("something"));
	});
});