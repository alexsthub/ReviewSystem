import mysql from "mysql";

function connectToMySQL(isTest?: boolean) {
	const port = isTest ? 3308 : 3307;
	let con: mysql.Connection = mysql.createConnection({
		host: "localhost",
		port: port,
		user: "root",
		password: "password",
		database: "reviewsystem",
	});
	con.connect(function (err: any) {
		if (err) throw err;
		console.log("Connected!");
	});
	return con;
}

export default connectToMySQL;
