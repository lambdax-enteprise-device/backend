const router = require("express").Router();

const Companies = require("../../data-models/companies/company-model.js");

//! Primary signup endpoint. Creates new company and first user
router.post("/signup", (req, res) => {
  const company = { company_name: req.body.company_name };
  const user = {
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    title: req.body.title,
    password: req.body.password
  };

  Companies.add(company, user)
    .then(company => {
      res.status(200).json({
        message: `Company ${company.company_name} and User ${user.email} created successfully`
      });
    })
    .catch(error => {
      res.status(500).json({ message: "Unable to add company" });
    });
});
