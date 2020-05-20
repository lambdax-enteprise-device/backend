const router = require("express").Router();

const Manufacturers = require("../../data-models/manufacturers/mfg-model.js");

// Get all Manufacturers
/**@api {get} /api/mfgs Get A List Of All Manufacturers
 * @apiName Manufacturers
 * @apiPermission Admin
 * @apiGroup Admin
 * @apiHeader {String} Berer_Token auth token
 * @apiSuccess {String} Returns a list of manufacturers
 */
router.get("/", (req, res) => {
  Manufacturers.findAllMfgs()
    .then(manufacturers => {
      res.status(200).json(manufacturers);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "Could not get Manufacturers", error: error });
    });
});

/**@api {post} /api/mfgs Add A Manufacturer
 * @apiName Manufacturers
 * @apiPermission Admin
 * @apiGroup Admin
 * @apiHeader {String} Berer_Token auth token
 * @apiParam {String} Name of manufacturer 
 * @apiSuccess {String} Id Returns the manufacturers id
 *
 *  */
router.post("/", (req, res) => {
  const manufacturer = req.body;
  Manufacturers.add(manufacturer)
    .then(manufacturer => {
      res.status(200).json(manufacturer);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "Unable to add manufacturer", error: error });
    });
});

/**@api {get} /api/mfgs/:id Find A Manufacturer By Id
 * @apiName Manufacturers
 * @apiPermission Admin
 * @apiGroup Admin
 * @apiHeader {String} Berer_Token auth token
 * @apiParam {Number} Manufacturer Id
 * @apiSuccess {String} Returns the manufacturer
 *
 *  */
router.get("/:id", (req, res) => {
  const { id } = req.params;

  Manufacturers.findById(id)
    .then(manufacturer => {
      res.status(200).json(manufacturer);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "Unable to retrieve manufacturer", error: error });
    });
});

/**@api {delete} /api/mfgs Delete A Manufacturer
 * @apiName Manufacturers
 * @apiPermission Admin
 * @apiGroup Admin
 * @apiHeader {String} Berer_Token auth token
 * @apiParam {Number} Id of manufacturer 
 * @apiSuccess {String} Message Return a success message
 *
 *  */
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Manufacturers.remove(id)
    .then(deletedmanufacturer => {
      res.status(204).end();
    })
    .catch(error => {
      res.status(500).json({ message: "Request with that ID not found" });
    });
});

module.exports = router;
