import React from "react";
import "./App.css";
import firebase from "firebase/app";

import SignUpForm from "./components/auth/SignUpForm";
import HomeScreen from "./components/review/HomeScreen";

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

	//A callback function for registering new users
	handleSignUp = (email, password, handle) => {
		this.setState({ errorMessage: null, loading: true }); //clear any old errors
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((userCredentials) => {
				let user = userCredentials.user;
				return user.updateProfile({
					displayName: handle,
				});
			})
			.catch((error) => {
				this.setState({ errorMessage: error.message });
			});
	};

	//A callback function for logging in existing users
	handleSignIn = (email, password) => {
		this.setState({ errorMessage: null }); //clear any old errors
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.catch((error) => {
				this.setState({ errorMessage: error.message });
			});
	};

	//A callback function for logging out the current user
	handleSignOut = () => {
		this.setState({ errorMessage: null }); //clear any old errors
		firebase
			.auth()
			.signOut()
			.catch((error) => {
				this.setState({ errorMessage: error.message });
			});
	};

	render() {
		if (this.state.loading) {
			return (
				<div className="text-center">
					<i className="fa fa-spinner fa-spin fa-3x" aria-label="Connecting..."></i>
				</div>
			);
		}

		console.log(this.state.user.uid);

		if (!this.state.user) {
			return (
				<div className="App">
					<div style={{ marginTop: "5%" }}>
						<SignUpForm signUpCallback={this.handleSignUp} signInCallback={this.handleSignIn} />
					</div>
				</div>
			);
		} else {
			return <HomeScreen />;
		}
	}
}
