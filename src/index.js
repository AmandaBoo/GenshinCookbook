import React from 'react';
import ReactDOM from 'react-dom';
import * as storage from "./storageInterfaces/storageInterface.js";
import "./styles.scss";
import MainPage from "./components/mainPage/MainPage";

storage.setUpLocalStorage();
ReactDOM.render(<MainPage />, document.getElementById("root"));