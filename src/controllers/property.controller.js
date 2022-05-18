const Property= require("../models/property.model.js");

exports.create = (req, res) =>{
    if(!req.body){
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }

    // Create a Property
    const {property_id, user_id, status, price, state, city, address, type, image_url, created_on} = req.body;
    const property = new Property (property_id, user_id, status, price, state, city, address, type, image_url, created_on);

    //Save Property in the database
    Property.create(property, (err, data)=>{
        if(err)
            res.status(500).send({
                message: err.message || "Some error occured while creating the Property."
            });
            else res.send(data)
    });
};


// Retrieve all users from the database
exports.findAll = (req, res)=>{
    Property.getAll((err, data)=>{
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
    Property.findById(Number(req.params.property_id), (err, data) => {
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



  // By Type

  exports.findSome = (req, res) => {
    Property.findByType((req.params.type), (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with type ${req.params.type}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving User with id " + req.params.type
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
    const { property_id, user_id, status, price, state, city, address, type, image_url, created_on } = req.body;
    Property.updateById(
      Number(req.params.property_id),
      new Property(property_id, user_id, status, price, state, city, address, type, image_url, created_on),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Property with id ${req.params.property_id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Property with id " + req.params.property_id
            });
          }
        } else res.send(data);
      }
    );
  };
  
  // Delete a User with the specified id in the request
  exports.delete = (req, res) => {
    Property.delete(Number(req.params.id), (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Property with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Property with id " + req.params.id
          });
        }
      } else res.send({ message: `Property was deleted successfully!` });
    });
  };