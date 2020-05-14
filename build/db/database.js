"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
function connectToMySQL(isTest) {
    const port = isTest ? 3308 : 3307;
    let con = mysql_1.default.createConnection({
        host: "localhost",
        port: port,
        user: "root",
        password: "password",
        database: "reviewsystem",
    });
    con.connect(function (err) {
        if (err)
            throw err;
        console.log("Connected!");
    });
    return con;
}
exports.default = connectToMySQL;
//# sourceMappingURL=database.js.map