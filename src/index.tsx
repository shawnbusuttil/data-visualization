import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import { applyMiddleware, combineReducers, createStore } from 'redux';

import profileReducer from "./store/reducer";

import App from './App';

const appReducer = combineReducers({
    profileState: profileReducer
});

const appState = createStore(appReducer, applyMiddleware(thunkMiddleware));

ReactDOM.render(
    <Provider store={appState}>
        <BrowserRouter basename="/">
            <App />
        </BrowserRouter>
    </Provider>, 
    document.getElementById("root")
);
