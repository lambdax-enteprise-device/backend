const router = require("express").Router();

const Companies = require("../../data-models/companies/company-model.js");

//* Create Company moved to Auth endpoints


/** @api {get}  /api/companies Get a list of all companies
 * @apiName Companies
 * @apiGroup Admin
 * @apiPermission Admin
 * @apiParamExample {json} Example Return:
 * [
  {
    "id": 1,
    "company_name": "Enterprise Devices",
    "active": true,
    "created_at": "2020-04-22T17:41:27.808Z",
    "updated_at": "2020-04-22T17:41:27.808Z"
  },
  {
    "id": 2,
    "company_name": "Test Company 2",
    "active": true,
    "created_at": "2020-04-22T17:41:27.808Z",
    "updated_at": "2020-04-22T17:41:27.808Z"
  },
  {


]

 * @apiSuccess {String} Company_List an array of companies 
 * 
 */
router.get("/", (req, res) => {
  Companies.findAllCompanies()
    .then(companies => {
      res.status(200).json(companies);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Could not get Companies" });
      
    });
});

/**@api {get}  /api/companies/:id Get a compnay by Id
 *@apiPermission Admin
*@apiName Companies
*@apiGroup Admin
*@apiParam {Number} id Company id 
*@apiHeader {String} Bearer_Token auth token 
*@apiSuccess {String} Company Returns the company matching the id
*/
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

/**@api {put} /api/companies/:id Update a company by id 
 @apiPermission Admin
*@apiName Companies
*@apiGroup Admin
*@apiParam {Number} id Company id 
 @apiParam {String} Updates The infomation you want changed. Entered in the body
*@apiHeader {String} Bearer_Token auth token 
*@apiSuccess {String} Updated_Company Returns the company updated id
  @apiExample {json} Example Body:
{
	"title":"Admins"
}
 *@apiParamExample {json} Example Response:
 [
  {
    "id": 26,
    "company_id": 28,
    "email": "info@mike-harley.tech",
    "password": "$2b$10$uoNIgzSeTmCRQoQZrpaWi.MdJgx/IvUv4eqT4wblkuwPadX2cZB3S",
    "first_name": "Mike",
    "last_name": "Harley",
    "title": "Admins",
    "created_at": "2020-05-13T11:15:31.700Z",
    "updated_at": "2020-05-13T11:15:31.700Z"
  }
]
 */
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
