import mysql from "mysql";

let con: mysql.Connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "password",
	database: "reviewsystem",
});
con.connect(function (err: any) {
	if (err) throw err;
	console.log("Connected!");
});

export default con;