const UserController = require('../../Controllers/userController');
const userController = new UserController();
const request = require("express");

require('jest');

describe('UserController GET ALL', function () {
    test('Should return 200', async () => {
        await request({uri: 'http://localhost:4000/users', method: 'GET'}, (err, res, body) => {
            expect(res.statusCode).toBe(200);
        });
    });
})

describe('UserController POST', function () {
    test('Should return 200', async () => {
        await request({uri: 'http://localhost:4000/users', method: 'POST'}, (err, res, body) => {
            expect(res.statusCode).toBe(200);
        });
    });
})

describe('UserController GET BY ID', function () {
    test('Should return 200', async () => {
        await request({uri: 'http://localhost:4000/users/0', method: 'GET'}, (err, res, body) => {
            expect(res.statusCode).toBe(200);
        });
    });
})

describe('UserController PUT', function () {
    test('Should return 200', async () => {
        await request({uri: 'http://localhost:4000/users/0', method: 'PUT'}, (err, res, body) => {
            expect(res.statusCode).toBe(200);
        });
    });
})

describe('UserController DELETE', function () {
    test('Should return 200', async () => {
        await request({uri: 'http://localhost:4000/users/0', method: 'DELETE'}, (err, res, body) => {
            expect(res.statusCode).toBe(200);
        });
    });
})

// Path: Test/Controllers/mediaController._test.js