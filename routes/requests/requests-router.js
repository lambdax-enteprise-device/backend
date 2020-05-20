const router = require("express").Router();

const Requests = require("../../data-models/requests/requests-model.js");
/**
 * @apiDefine Token
 * @apiHeader {string} Bearer auth token 
 
 */
// Get all users
/**@api {get} /api/requests Get Requests
 * @apiName Requests
 * @apiPermission Admin
 * @apiGroup Admin
 * 
 *@apiUse Token
 *
 *
 * @apiParamExample {json} Example Return: 
{
 
  {
    "id": 1,
    "company_id": 1,
    "location_id": 1,
    "employee_id": "1337",
    "employee_name": "Joel Perez",
    "employee_email": "joel.perez@enterprisedevices.com",
    "approver_name": "Jack Sparrow",
    "approver_email": "jack.sparrow@enterprisedevices.com",
    "request_justification": "I just want new stuff!",
    "approved": false,
    "created_at": "2020-04-22T17:41:27.826Z",
    "updated_at": "2020-04-22T17:41:27.826Z"
  }

}
 */
router.get("/", (req, res) => {
  Requests.findAllRequests()
    .then(requests => {
      res.status(200).json(requests);
    })
    .catch(error => {
      res.status(500).json({ message: "Could not get requests", error: error });
    });
});
/**@api {post} /api/requests/company Get a request by company name
 * @apiName Requests
 * @apiPermission Admin
 * @apiGroup Admin
 * @apiUse Token
 * @apiParam {string} company Company Name
 * @apiExample {json} Body Example:
 * {
 *   "company":"Enterprise Devices"
 * }
 * @apiParamExample Return Example:
 * [
  {
    "id": 1,
    "company_id": 1,
    "location_id": 1,
    "employee_id": "1337",
    "employee_name": "Joel Perez",
    "employee_email": "joel.perez@enterprisedevices.com",
    "approver_name": "Jack Sparrow",
    "approver_email": "jack.sparrow@enterprisedevices.com",
    "request_justification": "I just want new stuff!",
    "approved": false,
    "created_at": "2020-04-22T17:41:27.808Z",
    "updated_at": "2020-04-22T17:41:27.808Z",
    "company_name": "Enterprise Devices",
    "active": true
  },
  {
    "id": 1,
    "company_id": 1,
    "location_id": 1,
    "employee_id": "1337",
    "employee_name": "Mike Harley",
    "employee_email": "mike@mike.com",
    "approver_name": null,
    "approver_email": null,
    "request_justification": "I just want new stuff!",
    "approved": true,
    "created_at": "2020-04-22T17:41:27.808Z",
    "updated_at": "2020-04-22T17:41:27.808Z",
    "company_name": "Enterprise Devices",
    "active": true
  }
]
@apiSuccess {object} Requests returns a list of requests
 */
router.post("/company", (req, res) => {
  const  company  = req.body.company_name;

  Requests.findRequestsByCompany(company)
    .then(requests => {
      console.log(requests)
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

/**@api {post} /api/requests Post a request
 * 
 * @apiName Requests
 * @apiPermission Admin
 * @apiGroup Admin
*@apiUse Token
@apiParam {number} company_id: 
@apiParam {number} location_id: 
@apiParam {number} employee_id: 
@apiParam {string} employee_name: 
@apiParam {string} employee_email:
@apiParam {string} approver_name: 
@apiParam {string} approver_email:
@apiParam {string} request_justification:
@apiParam {boolean} approved:
@apiExample {json} Body Example:
 *
 {
    "company_id":1,
    "location_id":1,
    "employee_id":1337,
    "employee_name": "Mike Harley",
    "employee_email": "mike@mike.com",
    "request_justification": "I just want new stuff!",
    "approved": true
 }
 @apiParamExample {json} Return Example:
 {
  "id": 2,
  "company_id": 1,
  "location_id": 1,
  "employee_id": "1337",
  "employee_name": "Mike Harley",
  "employee_email": "mike@mike.com",
  "approver_name": null,
  "approver_email": null,
  "request_justification": "I just want new stuff!",
  "approved": true,
  "created_at": "2020-05-20T00:51:21.949Z",
  "updated_at": "2020-05-20T00:51:21.949Z"
 }
 @apiSuccess {Object} Request Returns The Request Object
 */
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
/**@api {post} /api/requests/:id Get request by id
 * 
 * @apiName Requests
 * @apiPermission Admin
 * @apiGroup Admin
*@apiUse Token
@apiParam {number} Id request id
@apiExample {json} Id Example:
    {
      2
    }
@apiParamExample {json} Return Example:
  {
  "id": 2,
  "company_id": 1,
  "location_id": 1,
  "employee_id": "1337",
  "employee_name": "Mike Harley",
  "employee_email": "mike@mike.com",
  "approver_name": null,
  "approver_email": null,
  "request_justification": "I just want new stuff!",
  "approved": true,
  "created_at": "2020-05-20T00:51:21.949Z",
  "updated_at": "2020-05-20T00:51:21.949Z"
  }

  @apiParam {number} Id request id
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
/**@api {post} /api/requests Post a request
 * 
 * @apiName Requests
 * @apiPermission Admin
 * @apiGroup Admin
*@apiUse Token
@apiParam {number} company_id: 
@apiParam {number} location_id: 
@apiParam {number} employee_id: 
@apiParam {string} employee_name: 
@apiParam {string} employee_email:
@apiParam {string} approver_name: 
@apiParam {string} approver_email:
@apiParam {string} request_justification:
@apiParam {boolean} approved:
@apiExample {json} Body Example:
 *
 {
    "company_id":1,
    "location_id":1,
    "employee_id":1337,
    "employee_name": "Mike Harley",
    "employee_email": "mike@mike.com",
    "request_justification": "I just want new stuff!",
    "approved": true
 }
 @apiParamExample {json} Return Example:
 {
  "id": 2,
  "company_id": 1,
  "location_id": 1,
  "employee_id": "1337",
  "employee_name": "Mike Harley",
  "employee_email": "mike@mike.com",
  "approver_name": null,
  "approver_email": null,
  "request_justification": "I just want new stuff!",
  "approved": true,
  "created_at": "2020-05-20T00:51:21.949Z",
  "updated_at": "2020-05-20T00:51:21.949Z"
 }
 @apiSuccess {Object} Request Returns The Request Object
 */
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
/**@api {put} /api/requests/:id Update request
 * 
 * @apiName Requests
 * @apiPermission Admin
 * @apiGroup Admin
*@apiUse Token
*@apiParam {number} Id request id
*@apiParam {string} Updates Changes made
*@apiExample {json} Id Example:
    {
      "approved":false
    }
*@apiParamExample {json} Return Example:
  {
 "id": 2,
  "company_id": 1,
  "location_id": 1,
  "employee_id": "1337",
  "employee_name": "Mike Harley",
  "employee_email": "mike@mike.com",
  "approver_name": null,
  "approver_email": null,
  "request_justification": "I just want new stuff!",
  "approved": false,
  "created_at": "2020-05-20T00:51:21.949Z",
  "updated_at": "2020-05-20T00:51:21.949Z"
  }
 * @apiSuccess {object} Request Returns updated request object
*/
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

/**@api {delete} /api/requests/:id Delete request
 * 
 * @apiName Requests
 * @apiPermission Admin
 * @apiGroup Admin
*  @apiUse Token
  @apiParam {number} Id request id
  
*/
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
