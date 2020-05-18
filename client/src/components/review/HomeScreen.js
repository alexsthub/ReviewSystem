import React from "react";

export default class SignUpForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = { companies: null, products: null };
	}

	componentDidMount = () => {
		this.fetchCompanies();
		this.fetchProducts();
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
		const companies = this.state.companies
			? this.state.companies.map((c) => {
					return <li key={c.company_name}>{c.company_name}</li>;
			  })
			: null;

		const products = this.state.products
			? this.state.products.map((p) => {
					return <li key={p.product_name}>{p.product_name}</li>;
			  })
			: null;

		return (
			<div>
				<p>Hello, this is the main content</p>

				<div>
					<p style={{ fontSize: 24 }}>List of Companies</p>
					<ul>{companies}</ul>
				</div>

				<div>
					<p style={{ fontSize: 24 }}>List of Products</p>
					<ul>{products}</ul>
				</div>
			</div>
		);
	}
}
