const db = require('../../data/db-config')
const Users = require('./users-model')

describe('users model', () => {

  describe('add()', () => {

    beforeEach(async () => {
      await db('users').truncate()
    })

    test.skip('should add the provided user into the db', async () => {
      await Users.add({first_name: 'Jack', company_id: 1})
      const users = await db('users')
      expect(users).toHaveLength(1)
    })

    test.skip('should return the users first name and the company id', async () => {
      const user = await Users.add({ first_name: "Jack", company_id: 1 })
      expect(user.first_name).toBe("Jack")
      expect(user.company_id).toBe(1)
    })
  })
})