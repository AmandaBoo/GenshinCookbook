import React from 'react';
import ReactGA from 'react-ga';
import ReactDOM from 'react-dom';
import * as storage from "./storageInterfaces/storageInterface.js";
import "./styles/lightColors.scss";
import MainPage from "./components/mainPage/MainPage";

const TRACKING_ID = "UA-212178985-1";
ReactGA.initialize(TRACKING_ID);

storage.setUpLocalStorage();
ReactDOM.render(<MainPage />, document.getElementById("root"));