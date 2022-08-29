import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import Sidebar from './Components/Sidebar_hy';
import {ChakraProvider, extendTheme} from "@chakra-ui/react";
import {BrowserRouter, Route, Routes, useLocation , HashRouter} from "react-router-dom";
import {} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SearchPage from "./Pages/SearchPage";
import ToolPage from "./Pages/ToolPage";
import HelpPage from "./Pages/HelpPage";
import ReferencePage from "./Pages/ReferencePage";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import TablePage from "./Pages/TablePage";

const config = {
    initialColorMode: 'dark',
    useSystemColorMode: true
};

const theme = extendTheme({ config });

function RouterMachine() {
    const location = useLocation()

    return (
            <Sidebar title="A platform for searching and predicting prokaryotic defence system">
                <TransitionGroup component={null}>
                    <CSSTransition key={location.key}
                                   timeout={300}
                                   classNames='page'>
                        <Routes location={location}>
                            <Route path="/" element={<HomePage/>}/>
                            <Route path="search" element={<SearchPage/>}/>
                            <Route path="table" element={<TablePage/>}/>
                            <Route path="tool" element={<ToolPage/>}/>
                            <Route path="help" element={<HelpPage/>}/>
                            <Route path="reference" element={<ReferencePage/>}/>
                        </Routes>
                    </CSSTransition>
                </TransitionGroup>
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
