import React from 'react';
import ReactDOM from 'react-dom';
import "./style/App.css";
import logo from "./asset/logo.svg";
import './style/index.css';
import { Slider, } from "../../src";

import { add } from "../../dist";


function CustomizedSlider() {
    return (
        <Slider />
    );
}

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn Reactffffffffff
                </a>
                <CustomizedSlider />
            </header>
        </div>
    );
}


ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

