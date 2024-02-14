const EventController = require('../../Controllers/eventController');
const eventController = new EventController();
const request = require("express");
require('jest')

describe('EventController GET ALL', function () {
    test('Should return 200', async () => {
        await request({uri: 'http://localhost:4000/events', method: 'GET'}, (err, res, body) => {
            expect(res.statusCode).toBe(200);
        });
    });
})

describe('EventController POST', function () {
    test('Should return 200', async () => {
        await request({uri: 'http://localhost:4000/events', method: 'POST'}, (err, res, body) => {
            expect(res.statusCode).toBe(200);
        });
    });
})

describe('EventController GET BY ID', function () {
    test('Should return 200', async () => {
        await request({uri: 'http://localhost:4000/events/0', method: 'GET'}, (err, res, body) => {
            expect(res.statusCode).toBe(200);
        });
    });
})

describe('EventController PUT', function () {
    test('Should return 200', async () => {
        await request({uri: 'http://localhost:4000/events/0', method: 'PUT'}, (err, res, body) => {
            expect(res.statusCode).toBe(200);
        });
    });
})

describe('EventController DELETE', function () {
    test('Should return 200', async () => {
        await request({uri: 'http://localhost:4000/events/0', method: 'DELETE'}, (err, res, body) => {
            expect(res.statusCode).toBe(200);
        });
    });
})

// Path: Test/Controllers/userController._test.js