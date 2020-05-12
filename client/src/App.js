import React from "react";
import "./App.css";
import firebase from "firebase/app";

import SignUpForm from "./components/auth/SignUpForm";

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { user: null, errorMessage: null, loading: true };
	}

	componentDidMount() {
		this.authUnRegFunc = firebase.auth().onAuthStateChanged((currentUser) => {
			if (currentUser) {
				this.setState({ user: currentUser, loading: false });
			} else {
				this.setState({ user: null, loading: false });
			}
		});
	}

	componentWillUnmount() {
		this.authUnRegFunc();
	}

	render() {
		return (
			<div className="App">
				<div style={{ marginTop: "5%" }}>
					<SignUpForm />
				</div>
			</div>
		);
	}
}
