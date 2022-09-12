import jwt from "jsonwebtoken";

const AuthMiddleware = async (req, res, next) => {
  try {
    let auth = req.headers.authorization;
    if (typeof auth === "undefined") {
      return res.status(401).json({
        message: "You are Not Authorized",
      });
    }

    var data = jwt.verify(auth, "secret");
    req.user = JSON.parse(JSON.stringify(data));
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export { AuthMiddleware };
