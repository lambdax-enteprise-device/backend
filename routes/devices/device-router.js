const router = require("express").Router();

const Devices = require("../../data-models/devices/devices-model.js");

// Get all users
/**@api {get} /api/devices Get all devices 
 * @apiName Devices
 * @apiPermission Admin
 * @apiGroup Admin
 * @apiHeader {String} Bearer_Token auth token 
 * @apiSuccess {String} Returns a list of all devices for a company
 * 
 */
router.get("/", (req, res) => {
  console.log(req)
    Devices.findAllDevices()
    .then(devices => {
      res.status(200).json(devices);
    })
    .catch(error => {
      res.status(500).json({ message: "Could not get Devices" });
    });
});

// Find Device by company id
/**@api {get} /api/devices/company/:id Get Devices by company id 
 *  @apiName Devices
 * @apiPermission Admin
 * @apiGroup Admin
 * @apiParam {Number} id company id
 * @apiHeader {String} Bearer_Token auth token 
 * @apiSuccess {String} Returns the devices matching the id
 * 
 */
router.get("/company/:id", (req, res) => {
  const { id } = req.params;
  Devices.findDevicesByCompanyId(id)
    .then(devices => {
      res.status(200).json(devices);
    })
    .catch(error => {
      res.status(500).json({ message: "Could not get devices by company" });
    });
});

/**@api {post}/api/devices/company Post Devices 
 *  @apiName Devices
 * @apiPermission Admin
 * @apiGroup Admin
 * @apiHeader {String} Bearer_Token auth token 
 * @apiParam {String} company The company name
 * @apiParam {Number} company_id The company id
 * @apiParam {Number} device_type_id The device type id
 * @apiParam {Number} location_id the location id
 * @apiParam {Number} manufacturer_id then manufacturer id
 *  
  *@apiSuccess {String} Id Return a device id
 * */
router.post("/company", (req, res) => {
  const { company } = req.body;
  Devices.findDevicesByCompany(company)
    .then(devices => {
      res.status(200).json(devices);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: `Could not find devices under ${company}` });
    });
});
/**
 *@api {post} /api/devices
 @apiName Devices
 @apiPermission Admin
 @apiGroup Admin
 @apiHeader {String} Bearer_Token jsonwebtoken
 @apiParam {String} company The company name
 * @apiParam {Number} company_id The company id
 * @apiParam {Number} device_type_id The device type id
 * @apiParam {Number} location_id the location id
 * @apiParam {Number} manufacturer_id then manufacturer id
 * @apiSuccess {String} Id Return a device id
 */
router.post("/", (req, res) => {
  const device = req.body;
  Devices.add(device)
    .then(device => {
      res.status(200).json(device);
    })
    .catch(error => {
      res.status(500).json({ message: "Unable to add device" });
    });
});


/**@api {post} /api/devices/:id Get Device By id 
 *  @apiName Devices
 * @apiPermission Admin
 * @apiGroup Admin
 * @apiParam {Number} id device_id
 * @apiHeader {String} Bearer_Token auth token 
 * @apiSuccess {String} Returns the devices matching the id
 * 
 */

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Devices.findById(id)
    .then(device => {
      res.status(200).json(device);
    })
    .catch(error => {
      res.status(500).json({ message: "Unable to retrieve device" });
    });
});
/**@api {put} /api/devices/:id  Update Device 
 *  @apiName Devices
 * @apiPermission Admin
 * @apiGroup Admin
 * @apiParam {Number} id company id
 * @apiParam {String} updates updates for the device
 * @apiParam {Number} updates updates for the device
 * @apiHeader {String} Bearer_Token auth token 
 * @apiSuccess {String} Returns the updated id
 * 
 */
router.put("/:id", (req, res) => {
  const { id } = req.params;

  Devices.update(id, req.body)
    .then(updatedDevice => {
      res.status(200).json(updatedDevice);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

//* Will need to add delete once the process for user deletion is created (i.e. once all the other dependent foreign keys are deleted in the proper order)

// this works fine
/**@api {delete} /api/devices/:id Delete Device 
 *  @apiName Devices
 * @apiPermission Admin
 * @apiGroup Admin
 * @apiParam {Number} id device id
 * 
 * @apiHeader {String} Bearer_Token auth token 
 * @apiSuccess {String} Returns a success message
 * 
*/
router.delete("/:id", async (req, res) => {
  try {
    const device = await Devices.remove(req.params.id);
    res.status(200).json(device);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error deleting device"
    })
  }
})

module.exports = router;
