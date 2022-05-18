const router = require("express").Router();

const propertyController = require('../controllers/property.controller');
const db = require ('../config/db.config');

const { signupValidation, loginValidation } = require('../validation/validation.js');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


module.exports = app => {

  /*router.post('/auth/signup', signupValidation, (req, res, next) => {
    db.query(`SELECT * FROM Users WHERE LOWER(email) = LOWER(${db.escape(req.body.email)});`,
    (err, result) => {
    if (result.length) {
    return res.status(409).send({
    msg: 'This user is already in use!'  
    });
    } else {
    // username is available
    bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
    return res.status(500).send({
    msg: err
    });
    } else {
    // has hashed pw => add to database
    db.query(
    `INSERT INTO Users (first_name, last_name, email, password) VALUES ('${req.body.name}', ${db.escape(
    req.body.email
    )}, ${db.escape(hash)})`,   
    (err, result) => {
    if (err) {
    throw err;
    return res.status(400).send({
    msg: err
    });
    }
    return res.status(201).send({
    msg: 'The user has been registerd with us!'
    });
    }
    );
    }
    });
    }
    }
    );
    });   
    */


  // Create a new User
  router.post("/", propertyController.create);
  

  // Retrieve all Users
  router.get("/", propertyController.findAll);

  // Retrieve a single User with id
  router.get("/:id", propertyController.findOne);

  router.get("/:type", propertyController.findSome);

  // Update a User with id
  router.put("/:id", propertyController.update);

  // Delete a User with id
  router.delete("/:id", propertyController.delete);

  app.use('/api/v1/property', router);

  // error handler
  app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    });
    next();
  });
};