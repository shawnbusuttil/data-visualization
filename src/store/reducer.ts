import { ProfileState } from "./state";
import { PROFILE_ACTIONS } from "./actions";

const INITIAL_STATE: ProfileState = {
    profiles: []
}

const reducer = (state = INITIAL_STATE, action: { type: string, payload?: any }): ProfileState => {
    switch (action.type) {
        case PROFILE_ACTIONS.fetchProfilesSuccess: {
            return {
                ...state,
                profiles: action.payload
            }
        }

        case PROFILE_ACTIONS.fetchProfilesFail: {
            return {
                ...state,
                error: action.payload
            }
        }

        default: {
            return state;
        }
    }
}

export default reducer;