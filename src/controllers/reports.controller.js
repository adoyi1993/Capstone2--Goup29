const Reports= require("../models/reports.model.js");

exports.create = (req, res) =>{
    if(!req.body){
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }

    // Create a Property
    const {report_id, property_id, created_on, reason, description} = req.body;
    const reports = new Reports (report_id, property_id, created_on, reason, description);

    //Save Property in the database
    Reports.create(reports, (err, data)=>{
        if(err)
            res.status(500).send({
                message: err.message || "Some error occured while creating the Property."
            });
            else res.send(data)
    });
};


// Retrieve all users from the database
exports.findAll = (req, res)=>{
    Reports.getAll((err, data)=>{
        if (err) 
            res.status(500).send({
                Message:
                    err.message || "Some errors occured while retrieving Propery."
            });
        else res.send(data);

    });
};


// Find a single User by ID

exports.findOne = (req, res) => {
    Reports.findById(Number(req.params.property_id), (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.property_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving User with id " + req.params.property_id
          });
        }
      } else res.send(data);
    });
  };
  
  
  // Update a User identified by the id in the request
  exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    const { report_id, property_id, created_on, reason, description } = req.body;
    Reports.updateById(
      Number(req.params.reports_id),
      new Reports(report_id, property_id, created_on, reason, description),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Report with id ${req.params.report_id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Report with id " + req.params.report_id
            });
          }
        } else res.send(data);
      }
    );
  };
  
  // Delete a User with the specified id in the request
  exports.delete = (req, res) => {
    Reports.delete(Number(req.params.id), (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Report with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Report with id " + req.params.id
          });
        }
      } else res.send({ message: `Report was deleted successfully!` });
    });
  };