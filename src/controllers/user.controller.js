const User= require("../models/user.model.js");

exports.create = (req, res) =>{
    if(!req.body){
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }

    // Create a User
    const {user_id, email, first_name, last_name, password, phone, address, is_admin} = req.body;
    const user = new User (user_id, email, first_name, last_name, password, phone, address, is_admin);

    //Save User in the database
    User.create(user, (err, data)=>{
        if(err)
            res.status(500).send({
                message: err.message || "Some error occured while creating the User."
            });
            else res.send(data)
    });
};


// Retrieve all users from the database
exports.findAll = (req, res)=>{
    User.getAll((err, data)=>{
        if (err) 
            res.status(500).send({
                Message:
                    err.message || "Some errors occured while retrieving Users."
            });
        else res.send(data);

    });
};


// Find a single User by ID

exports.findOne = (req, res) => {
    User.findById(Number(req.params.user_id), (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.user_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving User with id " + req.params.user_id
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
    const { user_id, email, first_name, last_name, password, phone, address, is_admin } = req.body;
    User.updateById(
      Number(req.params.user_id),
      new User(user_id, email, first_name, last_name, password, phone, address, is_admin),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found User with id ${req.params.user_id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating User with id " + req.params.user_id
            });
          }
        } else res.send(data);
      }
    );
  };
  
  // Delete a User with the specified id in the request
  exports.delete = (req, res) => {
    User.delete(Number(req.params.id), (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete User with id " + req.params.id
          });
        }
      } else res.send({ message: `User was deleted successfully!` });
    });
  };