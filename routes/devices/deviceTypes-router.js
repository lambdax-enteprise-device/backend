const router = require("express").Router();

const DeviceTypes = require("../../data-models/devices/deviceTypes-model");

// Get all Manufacturers
/**@api {get} /api/device_types Get Device Types 
 *  @apiName Device_Types
 * @apiPermission Admin
 * @apiGroup Admin
 * @apiHeader {String} Bearer_Token auth token 
 
 *  
  *@apiSuccess {String} Returns A List Of Manufacturers
 * */

router.get("/", (req, res) => {
  DeviceTypes.findAllTypes()
    .then(deviceTypes => {
      res.status(200).json(deviceTypes);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "Could not get device types", error: error });
    });
});
/**
 * @api {post} /api/device_types Post A Device Type
 *  @apiName Device_Types
 * @apiPermission Admin
 * @apiGroup Admin
 * @apiHeader {String} Bearer_Token auth token 
 @apiParam {String} Device_Type The type of device
 *  
  *@apiSuccess {String} Returns A Device_type id
 * */
router.post("/", (req, res) => {
  const deviceType = req.body;
  DeviceTypes.add(deviceType)
    .then(deviceType => {
      res.status(200).json(deviceType);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "Unable to add device type", error: error });
    });
});


/**@api {get} /api/device_types/:id Get Device Type By Id 
 *  @apiName Device_Types
 * @apiPermission Admin
 * @apiGroup Admin
 * @apiHeader {String} Bearer_Token auth token 
 @apiParam {String} ID Device_type id
 *  
  *@apiSuccess {String} Returns Device_type that matches id
 * */
router.get("/:id", (req, res) => {
  const { id } = req.params;

  DeviceTypes.findById(id)
    .then(deviceType => {
      res.status(200).json(deviceType);
    })
    .catch(error => {
      res.status(500).json({
        message: `Unable to retrieve device type at ID of ${id}`,
        error: error
      });
    });
});

/**@api {delete} /api/device_types/:id Delete A Device Type 
 *  @apiName Device_Types
 * @apiPermission Admin
 * @apiGroup Admin
 * @apiHeader {String} Bearer_Token auth token 
 @apiParam {String} Id Device_type Id
 *  
  *@apiSuccess {String} Returns Success Message
 * */

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  DeviceTypes.remove(id)
    .then(deletedDeviceType => {
      res.status(204).end();
    })
    .catch(error => {
      res.status(500).json({ message: "Request with that ID not found" });
    });
});

module.exports = router;
