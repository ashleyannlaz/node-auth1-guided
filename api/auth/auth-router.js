// 1.  register wired!, login wired! etc.
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("../users/users-model");

const validatePayload = (req, res, next) => {
  next();
};

router.post("/register", validatePayload, async (req, res, next) => {
  //res.json('register wired!')
  try {
    const { username, password } = req.body;
    const hash = bcrypt.hashSync(password, 8);
    const user = { username, password: hash };
    const createdUser = await Users.add(user);
    res.status(201).json(createdUser);
  } catch (error) {
    next(error);
  }
});
router.post("/login", validatePayload, async (req, res, next) => {
  try {
    const { username, password } = req.body;
    // does username correspond to an existing user?
    const [user] = await Users.findBy({ username });
    //if existing has length awesome if not bye user
    if (user && bcrypt.compareSync(password, user.password)) {
      console.log(req.session);
      req.session.user = user; //cookie will be set and sessions stored
      res.send({ message: `Welcome ${username}, have a cookie!` });
    } else {
      next({ status: 401, message: "bad credentials" });
    }
  } catch (error) {
    next(error);
  }
});
router.get("/logout", async (req, res, next) => {
  if (req.session.user) {
      req.session.destroy(error => {
          if(error) {
              res.json({message: 'sorry, you cannot leave'})
          } else {
              res.json({message: 'bye!'})
          }
      })
  } else {
    res.json({ message: "but I do not know you!" });
  }
});

module.exports = router;
