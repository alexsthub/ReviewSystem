import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.css";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

import firebase from "firebase/app";
import "firebase/auth";
import config from "./firebaseConfig";
firebase.initializeApp(config);

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
);

serviceWorker.unregister();
