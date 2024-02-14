const MediaController = require('../.././Controllers/mediaController');
const mediaController = new MediaController();
const request = require("express");

require('jest');

describe('MediaController GET ALL', function () {
    test('Should return 200', async () => {
        await request({uri: 'http://localhost:4000/medias', method: 'GET'}, (err, res, body) => {
            expect(res.statusCode).toBe(200);

        });
    });
});

describe('MediaController POST', function () {
    const post = {username: "x", originalFileName: "x", fileName: "x", path: "x", format: "x", type: "x", lastModified: 0, size: 0, uploaded_at: new Date()};

    test('Should return 200', async () => {
        await request({uri: 'http://localhost:4000/medias', method: 'POST', post}, (err, res, body) => {
            expect(res.body).toBe(post);
            expect(res.statusCode).toBe(200);
        });
    })
});

describe('MediaController PUT', function () {
    const put = {username: "x", originalFileName: "x", fileName: "x", path: "x", format: "x", type: "x", lastModified: 0, size: 0, uploaded_at: new Date()};

    test('Should return 200', async () => {
        await request({uri: 'http://localhost:4000/medias/0', method: 'PUT', put}, (err, res, body) => {
            expect(res.body).toBe(put);
            expect(res.statusCode).toBe(200);
        });
    })
})

describe('MediaController DELETE', function () {
    test('Should return 200', async () => {
        await request({uri: 'http://localhost:4000/medias/0', method: 'DELETE'}, (err, res, body) => {
            expect(res.statusCode).toBe(200);
        });
    })
})

describe('MediaController GET BY ID', function () {
    test('Should return 200', async () => {
        await request({uri: 'http://localhost:4000/medias/0', method: 'GET'}, (err, res, body) => {
            expect(res.statusCode).toBe(200);
        });
    })
})

describe('MediaController GET BY USERNAME', function () {
    test('Should return 200', async () => {
        await request({uri: 'http://localhost:4000/medias/username/x', method: 'GET'}, (err, res, body) => {
            expect(res.statusCode).toBe(200);
        });
    })
})