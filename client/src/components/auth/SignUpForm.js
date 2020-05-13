import React from "react";
import "./SignUpForm.css";

export default class SignUpForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: undefined,
			password: undefined,
			handle: undefined,
		};
	}

	handleChange = (event) => {
		let field = event.target.name;
		let value = event.target.value;

		let changes = {};
		changes[field] = value;
		this.setState(changes);
	};

	handleSignUp = (event) => {
		event.preventDefault();
		this.props.signUpCallback(this.state.email, this.state.password, this.state.handle);
	};

	handleSignIn = (event) => {
		event.preventDefault();
		this.props.signInCallback(this.state.email, this.state.password);
	};

	render() {
		return (
			<div>
				<h1>App</h1>

				<form>
					<div className="form-group">
						<label htmlFor="email">Email</label>
						<input
							className="form-control"
							id="email"
							type="email"
							name="email"
							onChange={this.handleChange}
						/>
					</div>

					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input
							className="form-control"
							id="password"
							type="password"
							name="password"
							onChange={this.handleChange}
						/>
					</div>

					<div className="form-group">
						<label htmlFor="handle">Username</label>
						<input
							className="form-control"
							id="handle"
							name="handle"
							onChange={this.handleChange}
						/>
					</div>

					<div className="form-group">
						<button className="btn btn-primary mr-2" onClick={this.handleSignUp}>
							Sign-up
						</button>
						<button className="btn btn-primary" onClick={this.handleSignIn}>
							Sign-in
						</button>
					</div>
				</form>
			</div>
		);
	}
}
