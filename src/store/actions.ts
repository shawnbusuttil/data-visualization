import { AnyAction } from 'redux';
import { ThunkDispatch } from "redux-thunk";

import { Profile } from "../models/Profile";

export const PROFILE_ACTIONS = {
    fetchProfiles: "[Profiles] Fetch Profiles",
    fetchProfilesSuccess: "[Profiles] Fetch Profiles Success",
    fetchProfilesFail: "[Profiles] Fetch Profiles Fail"
}

export const profileActions = {
    fetchProfiles() {
        return {
            type: PROFILE_ACTIONS.fetchProfiles
        }
    },
    fetchProfilesSuccess(payload: Profile[]) {
        return {
            type: PROFILE_ACTIONS.fetchProfilesSuccess,
            payload
        }
    },
    fetchProfilesFail(payload: string) {
        return {
            type: PROFILE_ACTIONS.fetchProfilesFail,
            payload
        }
    }
}

/*
** If cache hits, return from local storage else fetch from API.
*/
export function getProfiles(): any {
    return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
        dispatch(profileActions.fetchProfiles());
        const profiles = localStorage.getItem("profiles");

        if (profiles) {
            const parsedProfiles = JSON.parse(profiles);
            dispatch(profileActions.fetchProfilesSuccess(parsedProfiles));
        }

        return fetch("./data.json").then(res => res.json())
            .then(profiles => {
                localStorage.setItem("profiles", JSON.stringify(profiles));
                dispatch(profileActions.fetchProfilesSuccess(profiles));
            })
            .catch(error => dispatch(profileActions.fetchProfilesFail("Data could not be fetched.")))
    }
}