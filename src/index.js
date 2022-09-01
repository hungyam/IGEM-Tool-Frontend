import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import Sidebar from './Components/Sidebar_hy';
import {ChakraProvider, extendTheme} from "@chakra-ui/react";
import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SearchPage from "./Pages/SearchPage";
import ToolPage from "./Pages/ToolPage";
import HelpPage from "./Pages/HelpPage";
import ReferencePage from "./Pages/ReferencePage";
import TablePage from "./Pages/TablePage";
import ModelPage from "./Pages/ModelPage";

const config = {
    initialColorMode: 'system',
    useSystemColorMode: false
};

const theme = extendTheme({config});

function RouterMachine() {
    const location = useLocation()

    return (
        <Sidebar title="A platform for searching and predicting prokaryotic defence system">
            <Routes location={location}>
                <Route path="/" element={<HomePage/>}/>
                <Route path="search" element={<SearchPage/>}/>
                <Route path="model" element={<ModelPage/>}/>
                <Route path="table" element={<TablePage/>}/>
                <Route path="tool" element={<ToolPage/>}/>
                <Route path="help" element={<HelpPage/>}/>
                <Route path="reference" element={<ReferencePage/>}/>
            </Routes>
        </Sidebar>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <ChakraProvider theme={theme}>
            <BrowserRouter>
                <RouterMachine/>
            </BrowserRouter>
        </ChakraProvider>
    </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
