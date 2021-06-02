"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../lib/db");
exports.createDepartment = (arg) => {
    const mutation = `
    INSERT INTO depertments(id,name) 
    VALUES('${arg.uniqid}', '${arg.name}');
    `;
    try {
        db_1.client.query(mutation, (err, res) => {
            if (err) {
                console.log(err);
                throw new Error('Error mutating in DB');
            }
        });
        return true;
    }
    catch (error) {
        return false;
    }
};
exports.editDepartment = (arg) => {
    const mutation = `
    UPDATE depertments
    SET name= '${arg.name}' 
    WHERE id='${arg.id}';
    `;
    try {
        db_1.client.query(mutation, (err, res) => {
            if (err) {
                console.log(err);
                throw new Error('Error mutating in DB');
            }
        });
        return true;
    }
    catch (error) {
        return false;
    }
};
exports.deleteDepartment = (arg) => {
    const { id } = arg;
    const mutation = `
    DELETE FROM depertments
    WHERE id='${id}';
    `;
    try {
        db_1.client.query(mutation, (err, res) => {
            if (err) {
                console.log(err);
                throw new Error('Error mutating in db');
            }
        });
        return true;
    }
    catch (error) {
        return false;
    }
};
exports.deleteEmployee = (arg) => {
    const mutation = `
    DELETE FROM Employee
    WHERE id='${arg.id}';
    `;
    try {
        db_1.client.query(mutation, (err, res) => {
            if (err) {
                console.log(err);
                throw new Error('Error mutating in db');
            }
        });
        return true;
    }
    catch (error) {
        return false;
    }
};
exports.createEmployee = (arg) => {
    const mutation = `
    INSERT INTO Employee(id, firstname, lastname, age, departmentname) 
    VALUES('${arg.uniqid}', '${arg.firstName}', '${arg.lastName}', '${arg.age}', '${arg.department}');
    `;
    try {
        db_1.client.query(mutation, (err, res) => {
            if (err) {
                console.log(err);
                throw new Error('Error mutating in db');
            }
        });
        return true;
    }
    catch (error) {
        return false;
    }
};
exports.editEmployee = (arg) => {
    const mutation = `
    UPDATE Employee
    SET firstname= '${arg.firstName}',
        lastname= '${arg.lastName}',
        age='${arg.age}',
        departmentname= '${arg.department}' 
    WHERE id='${arg.id}';
    `;
    try {
        db_1.client.query(mutation, (err, res) => {
            if (err) {
                console.log(err);
                throw new Error('Error mutating in db');
            }
        });
        return true;
    }
    catch (error) {
        return false;
    }
};
