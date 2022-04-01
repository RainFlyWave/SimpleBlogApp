import React, { Component } from "react";
import { render } from "react-dom";
import { Introduction } from "./Introduction";
import { Login } from "./Login";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

require('bootstrap/dist/css/bootstrap.css');
require('./../../static/css/Login.css');
require('./../../static/css/Introduction.css');



export const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Introduction />} />
                <Route path="/login" element={<Login />} />

            </Routes>
        </BrowserRouter>
    )
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);