import React, { Component, useContext, useState } from "react";
import { render } from "react-dom";
import { Introduction } from "./Introduction";


import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";


require('bootstrap/dist/css/bootstrap.css');






export const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Introduction />} />
            </Routes>
        </BrowserRouter>
    )
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);