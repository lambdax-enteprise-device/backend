const request = require('supertest');
const server = require('../../api/server.js');

describe('users_devices-router.js', ()=> {
    describe('get request', ()=> {
        it('should return an OK status code from the index route', async ()=>{
            const expectedStatusCode = 200;
            const response = await request(server).get('/api/user_devices');
            expect(response.status).toEqual(expectedStatusCode);
        })
        it('should return a JSON object from the get request', async ()=> {
            const response = await request(server).get('/api/user_devices');
            expect(response.type).toEqual('application/json');
        })
        it('should return 404 error code from the get request', async ()=>{
            const expectedStatusCode = 404;
            const response = await request(server).get('/api/user_devicess');
            expect(response.status).toEqual(expectedStatusCode);
        })
})
})