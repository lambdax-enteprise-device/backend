const db =  require('../../data/db-config.js');
const UsersDevices = require('./users_devices-model.js');

beforeEach(async ()=>{
    await db('users_devices').truncate()
})

describe('users_devices model', ()=> {
    describe('insert()', ()=>{
        it('should insert the provided users_devices into the db', async () =>{
            await UsersDevices.add({ user_id: 1,
                                        device_id: 2,
                                        reserve_start: "1-1-2020",
                                        reserve_end: "1-1-2022"
            })
            await UsersDevices.add({ user_id: 1,
                device_id: 3,
                reserve_start: "1-1-2020",
                reserve_end: "1-1-2022"
})
            const users = await db('users_devices');
            console.log(users);
            expect(users).toHaveLength(2);
            
        })
    })
})