const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.token;

    const SALT = process.env.ACCESS_TOKEN_SECRET;

    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, SALT, (err, decodedToken) => {
        if (err instanceof jwt.TokenExpiredError)
          return res.status(401).json({ message: "Access Token Expired" });

        if (err)
          return res
            .status(403)
            .json({ message: "Invalid token, authentication is required" });

        req.userId = decodedToken.id;
        next();
      });
    } else {
      return res.status(401).json({ message: "Authentication required" });
    }
  } catch (err) {
    console.log("Auth middleware, verifyToken: ", err);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { verifyToken };
