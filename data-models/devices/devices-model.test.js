const db = require('../../data/db-config')
const Devices = require('./devices-model')

describe('devices model', () => {

  describe('add()', () => {

    beforeEach(async () => {
      await db('devices').truncate()
    })

    test('should add the provided device into the db', async () => {
      await Devices.add({internal_id: 'ACR665'})

      const devices = await db('devices')
      expect(devices).toHaveLength(1)
    })

    test('should return the device internal_id', async () => {
      const device = await Devices.add({ internal_id: "ACR665" })
      expect(device.internal_id).toBe('ACR665')
    })
  })
})