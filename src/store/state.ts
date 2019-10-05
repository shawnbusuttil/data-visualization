import Profile from "../models/Profile";

export interface ProfileState {
    profiles: Profile[];
    error?: Error;
}

export interface AppState {
    profileState: ProfileState;
}