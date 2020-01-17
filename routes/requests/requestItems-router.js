const router = require("express").Router();

const RequestItems = require("../../data-models/requests/requestItems-model.js");

router.get("/", (req, res) => {
  const { companyId } = req.body;

  RequestItems.findRequestedItemsByCompany(companyId)
    .then(requestedItems => {
      res.status(200).json(requestedItems);
    })
    .catch(error => {
      res
        .status(500)
        .json({
          message: `Could not get currently requested devices`,
          error: error
        });
    });
});
