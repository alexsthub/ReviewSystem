"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
function handleGetTotalCompanies(req, res, db) {
    db.query("SELECT * from companies", function (err, response) {
        if (err) {
            res.status(400);
            res.send("Error retrieving companies");
            return;
        }
        res.status(200);
        res.json(response);
    });
}
exports.handleGetTotalCompanies = handleGetTotalCompanies;
function handleCompanyAdd(req, res, db) {
    const user = helpers_1.getUser(req);
    const newCompany = req.body;
    const userID = user.id;
    const companyName = newCompany.companyName;
    db.query("INSERT INTO companies values (company_name, creator_id, created) VALUES (?, ?, current_timestamp)", [companyName, userID], function (err, response) {
        if (err) {
            res.status(400);
            res.send("Error creating new company");
            return;
        }
        res.status(201);
        const newID = response.insertId;
        helpers_1.getCompanyByID(newID, db, function (err, response) {
            if (err) {
                res.send("Inserted but cannot get the returned result");
                return;
            }
            res.json(response[0]);
            return;
        });
    });
}
exports.handleCompanyAdd = handleCompanyAdd;
function handleCompanyDelete(req, res, db) {
    const user = helpers_1.getUser(req);
    const companyID = Number(req.params.companyID);
    helpers_1.getCompanyByID(companyID, db, function (err, response) {
        if (err) {
            res.status(400);
            res.send("Error getting company");
            return;
        }
        const creatorID = response[0].creator_id;
        if (!helpers_1.isOwner(user, creatorID)) {
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
    });
}
exports.handleCompanyDelete = handleCompanyDelete;
function handleCompanyEdit(req, res, db) {
    const user = helpers_1.getUser(req);
    const companyID = Number(req.params.companyID);
    helpers_1.getCompanyByID(companyID, db, function (err, response) {
        if (err) {
            res.status(400);
            res.send("Error getting company");
            return;
        }
        const creatorID = response[0].creator_id;
        if (!helpers_1.isOwner(user, creatorID)) {
            res.status(401);
            res.send("User is not authenticated for this action");
            return;
        }
        const body = req.body;
        const newName = body.name;
        db.query("UPDATE companies SET company_name = ? WHERE id = ?", [newName, companyID], function (err, response) {
            if (err || response.affectedRows === 0) {
                res.status(400);
                res.send("Error updating company name");
                return;
            }
            helpers_1.getCompanyByID(companyID, db, function (err, response) {
                if (err) {
                    res.send("Updated but cannot get the returned result");
                    return;
                }
                res.json(response[0]);
                return;
            });
        });
    });
}
exports.handleCompanyEdit = handleCompanyEdit;
//# sourceMappingURL=companyHandlers.js.map