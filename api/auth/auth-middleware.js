// #STEP4

function restricted(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    next({ status: 401, message: "Bad Credentials" });
  }
}

module.exports = { restricted };
