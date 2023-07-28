import mysql from "mysql2";
import { dbconfig } from "../config/db";

const connection = mysql.createConnection(dbconfig);

export const findAllUsers = () => {

    connection.query("SELECT * FROM users;", (err, results, fields) => {
        console.log(results);
    });
}