const jwt = require("jsonwebtoken");
// const config = require("../config/auth.config.js");
const { secret } = require("../config");
const authModel = require('../models/authModel');

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    // console.log(decoded);
    req.userId = decoded.id;
    req.userName = decoded.username;
    next();
  });
};

const checkDuplicateUsername = async (req, res, next) => {
    try {
        let [status, data] = await authModel.getUser(req.body.username, next);
        if (status = 1) {
            return res.status(400).json({
                code: -1,
                msg: 'Failed! Username is already in use!',
                data: [],
            });
        }
        console.log(data);
        return res.status(500).json({
            code: 1,
            msg: 'success',
            data: [],
        });
    } catch (error) {
        next(error);
    }

}

module.exports = {
    verifyToken,
    checkDuplicateUsername,
};