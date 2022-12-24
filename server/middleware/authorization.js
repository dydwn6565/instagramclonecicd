const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization; //Bearer TOken

  if (!authHeader) {
    const error = new Error("Not authenticated");
    error.statusCode = 401;
    throw error;
  }

  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (err) {
    err.statusCode = 500;

    console.log(err.message);
    return res.json(err);
  }

  if (!decodedToken) {
    const error = new Error("not authenticated");
    return res.json({ message: error });
  }

  req.userId = decodedToken.userId;
  next();
};

// module.exports=authorization;
