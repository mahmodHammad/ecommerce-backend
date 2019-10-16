const jwt = require("jsonwebtoken");

// I need to verify if user is admin
function auth(req, res, next) {
  const token = req.header("x-token");

  if (!token) return res.status(401).send("ACCESS DENIED  , No token provided");

  try {
    const decoded = jwt.verify(token, "key");
    req.user = decoded;
    console.log(decoded);
    next();
  } catch (error) {
    res.status(400).send("INVALID TOKKKKEN");
  }
}

module.exports = auth;
//i shold put this meddleware function as 2nd paramiter to router
