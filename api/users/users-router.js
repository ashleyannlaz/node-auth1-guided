const router = require("express").Router();
const {add} = require('../users/users-model')

// #STEP5 import auth
const { restricted } = require('../auth/auth-middleware');

const Users = require("./users-model.js");

router.get("/", restricted, (req, res, next) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(next);
});

module.exports = router;
