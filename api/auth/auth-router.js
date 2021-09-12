// 1.  register wired!, login wired! etc.
const router = require("express").Router();

const validatePayload = (req, res, next) => {
  next();
};

router.post("/register", validatePayload, async (req, res, next) => {
  //res.json('register wired!')
  try {
    const { username, password } = req.body;
    console.log(username,password)
    res.json({ username, password });
  } catch (error) {
    next(error)
  }
});
router.post("/login", validatePayload, async (req, res, next) => {
  res.json("login wired!");
});
router.get("/logout", async (req, res, next) => {
  res.json("logout wired!");
});

module.exports = router;
