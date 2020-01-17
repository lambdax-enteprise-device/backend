const router = require("express").Router();

const Requests = require("../../data-models/requests/requests-model.js");

// Get all users
router.get("/", (req, res) => {
  Requests.findAllRequests()
    .then(requests => {
      res.status(200).json(requests);
    })
    .catch(error => {
      res.status(500).json({ message: "Could not get requests", error: error });
    });
});

router.post("/company", (req, res) => {
  const { company } = req.body;
  Requests.findRequestsByCompany(company)
    .then(requests => {
      res.status(200).json(requests);
    })
    .catch(error => {
      res
        .status(500)
        .json({
          message: `Could not find devices under ${company}`,
          error: error
        });
    });
});

router.post("/", (req, res) => {
  const request = req.body;
  Requests.add(request)
    .then(request => {
      res.status(200).json(request);
    })
    .catch(error => {
      res.status(500).json({ message: "Unable to add device", error: error });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Requests.findById(id)
    .then(request => {
      res.status(200).json(request);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "Unable to retrieve device", error: error });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;

  Requests.update(id, req.body)
    .then(updatedRequest => {
      res.status(200).json(updatedRequest);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Requests.remove(id)
    .then(deletedRequest => {
      res.status(204).end();
    })
    .catch(error => {
      res.status(500).json({ message: "Request with that ID not found" });
    });
});

//* Will need to add delete once the process for user deletion is created (i.e. once all the other dependent foreign keys are deleted in the proper order)

module.exports = router;
