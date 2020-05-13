import React from "react";

export default class SignUpForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = { companies: null, products: null };
	}

	componentDidMount = () => {
		console.log("heelo");
		this.fetchCompanies();
		// this.fetchProducts();
	};

	fetchCompanies = () => {
		fetch("http://localhost:8080/company")
			.then((response) => {
				return response.json();
			})
			.then((allCompanies) => {
				this.setState({ companies: allCompanies });
			})
			.catch((err) => {
				console.log(err);
			});
	};

	fetchProducts = () => {
		fetch("http://localhost:8080/products")
			.then((response) => {
				return response.json();
			})
			.then((allProducts) => {
				this.setState({ products: allProducts });
			})
			.catch((err) => {
				console.log(err);
			});
	};

	render() {
		return (
			<div>
				<p>Hello, this is the main content</p>
			</div>
		);
	}
}
