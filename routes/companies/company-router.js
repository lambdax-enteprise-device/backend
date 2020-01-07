const router = require("express").Router();

const Companies = require("../../data-models/companies/company-model.js");

// Get all users
router.get("/", (req, res) => {
  Companies.findAllCompanies()
    .then(companies => {
      res.status(200).json(companies);
    })
    .catch(error => {
      res.status(500).json({ message: "Could not get Companies" });
    });
});

router.post("/", (req, res) => {
  //   const {company_name} = req.body;
  const company = { company_name: req.body.company_name };
  const user = {
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    title: req.body.title
  };
  //   console.log("company", company);
  //   console.log("user", user);

  Companies.add(company, user)
    .then(company => {
      res
        .status(200)
        .json({
          message: `Company ${company.company_name} and User ${user.email} created successfully`
        });
    })
    .catch(error => {
      res.status(500).json({ message: "Unable to add company" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Companies.findById(id)
    .then(company => {
      res.status(200).json(company);
    })
    .catch(error => {
      res.status(500).json({ message: "Unable to retrieve company" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;

  Companies.update(id, req.body)
    .then(updatedCompany => {
      res.status(200).json(updatedCompany);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

//* Will need to add delete once the process for user deletion is created (i.e. once all the other dependent foreign keys are deleted in the proper order)

module.exports = router;
