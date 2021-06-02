"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = exports.dbConnect = void 0;
const pg_1 = require("pg");
const client = new pg_1.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'testdb',
    password: 'password',
    port: 5432,
});
exports.client = client;
const makeDepartmentDb = () => {
    const query = `
    CREATE TABLE depertments (
        id varchar,
        name varchar
    );`;
    client.query(query, (err, res) => {
        if (err)
            throw err;
        console.log('Successfull');
    });
};
const createemployeeDb = () => {
    const query = `
    CREATE TABLE Employee (
    id varchar,
    firstName varchar,
    lastName varchar,
    age int,
    departmentName varchar
);`;
    client.query(query, (err, res) => {
        if (err)
            throw err;
        console.log('Successfull');
    });
};
const dbConnect = (cb) => {
    client.connect();
    // Make Databases
    // makeDepartmentDb()
    // createemployeeDb()
    cb();
};
exports.dbConnect = dbConnect;
