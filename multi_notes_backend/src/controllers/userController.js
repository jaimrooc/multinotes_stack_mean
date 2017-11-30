'use strict';

let mongoose = require('mongoose');
let User = mongoose.model('User');
let jwt = require('jsonwebtoken');
let config = require('../../config');

exports.listAllValuesOfEachUser = function (req, res) {
  User.find({}, function (err, doc) {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).json(doc);
  });
};

exports.createUser = function (req, res) {
  let user = new User(req.body);
  user.save(function (err, doc) {
    if (err) {
      res.status(400).send(err);
    }
    res.status(201).json(doc);
  });
};

//--------------
exports.authenticateUser = function (req, res) {
  User.findOne({
    username: req.body.username
  }, function (err, user) {
    if (err)
      throw err;

    if (!user) {
      res.status(400).json({ success: false, message: 'Autenticación fallida, usuario no encontrado.' });
    } else if (user) {
      // check if password matches
      if (user.password != req.body.password) {
        res.status(400).json({ success: false, message: 'Autenticación fallida, password erróneo.' });
      } else {
        // if user is found and password is right
        // create a token
        var payload = {
          admin: user.admin
        }
        var token = jwt.sign(payload, "claveSecreta", {
          expiresIn: "24h" // expires in 1 minute
        });

        res.status(200).json({
          success: true,
          message: 'Este es tu token de acceso!',
          token: token
        });
      }
    }
  });
}