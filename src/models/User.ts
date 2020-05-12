export default class User {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	timeCreated: Date;

	constructor(
		firstName: string,
		lastName: string,
		email: string,
		password: string,
		timeCreated: Date
	) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.timeCreated = timeCreated;
	}
}
