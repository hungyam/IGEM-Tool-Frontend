import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import Sidebar from './Components/Sidebar_hy';
import {ChakraProvider, extendTheme} from "@chakra-ui/react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SearchPage from "./Pages/SearchPage";
import ToolPage from "./Pages/ToolPage";
import HelpPage from "./Pages/HelpPage";
import ReferencePage from "./Pages/ReferencePage";

const config = {
    initialColorMode: "dark",
    useSystemColorMode: true
};

const theme = extendTheme({ config });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ChakraProvider theme={theme}>
        <BrowserRouter>
            <Sidebar>
                <Routes>
                    <Route path="/" exact element={HomePage()}/>
                    <Route path="/search" exact element={SearchPage()}/>
                    <Route path="/tool" exact element={ToolPage()}/>
                    <Route path="/help" exact element={HelpPage()}/>
                    <Route path="/reference" exact element={ReferencePage()}/>
                </Routes>
            </Sidebar>
        </BrowserRouter>
    </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
