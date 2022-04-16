import React, { Component, useContext, useState } from "react";
import { render } from "react-dom";
import { Introduction } from "./Introduction";
import { createContext } from "react";



import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
require('./AllStyles');






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