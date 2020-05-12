import mysql from "mysql";
import { getUser } from "./helpers";

function handleGetTotalCompanies(req: any, res: any, db: mysql.Connection) {
	db.query("Select * from companies", function (err, response: object[]) {
		if (err) {
			res.status(400);
			res.send("Error retrieving companies");
			return;
		}
		res.status(200);
		res.json(response);
	});
}

function handleCompanyAdd(req: any, res: any, db: mysql.Connection) {
	const user = getUser(req);
	const newCompany: any = req.body;

	const userID: number = user.id;
	const companyName: string = newCompany.companyName;

	db.query(
		"INSERT INTO companies values (company_name, creator_id, created) VALUES (?, ?, current_timestamp)",
		[companyName, userID],
		function (err, response) {
			if (err) {
				res.status(400);
				res.send("Error creating new company");
				return;
			}
			res.status(201);
			res.send(response);
		}
	);
}

function handleCompanyDelete(req: any, res: any, db: mysql.Connection) {
	const user = getUser(req);
	const companyID: number = Number(req.params.companyID);
	if (!isOwner(user, companyID)) {
		res.status(401);
		res.send("User is not authenticated for this action");
		return;
	}
	db.query("DELETE FROM companies WHERE id = ?", companyID, function (err, response) {
		if (err) {
			res.status(400);
			res.send("Error deleting company");
			return;
		}
		res.status(200);
		res.send("Company Deleted");
		return;
	});
}

function handleCompanyEdit(req: any, res: any, db: mysql.Connection) {
	const user = getUser(req);
	const companyID: number = Number(req.params.companyID);
	if (!isOwner(user, companyID)) {
		res.status(401);
		res.send("User is not authenticated for this action");
		return;
	}
	const body: any = req.body;
	const newName: string = body.name;

	db.query("UPDATE companies SET company_name = ? WHERE id = ?", [newName, companyID], function (
		err,
		response
	) {
		if (err || response.affectedRows === 0) {
			res.status(400);
			res.send("Error updating company name");
			return;
		}
		db.query("SELECT * from companies WHERE id = ?", companyID, function (err, response) {
			res.status(200);
			if (err || response.length !== 1) {
				res.send("Updated but cannot get the returned result");
				return;
			}
			res.json(response[0]);
			return;
		});
	});
}

function isOwner(user: any, companyID: number) {
	return user && companyID && user.id === companyID;
}

export { handleGetTotalCompanies, handleCompanyAdd, handleCompanyDelete, handleCompanyEdit };
