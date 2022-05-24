import mysql from 'mysql';
let dotenv = require('dotenv');
let util = require('util');

// env vars
dotenv.config();
const host = process.env.MYSQL_URL;
const user = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASS;
const database = process.env.MYSQL_DB;

// set up mysql connection
export const connection = mysql.createConnection({ host, user, password, database });
connection.query = util.promisify(connection.query);