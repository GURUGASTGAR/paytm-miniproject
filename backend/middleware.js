  const express = require("express");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.trim().startsWith("Bearer ")) {
    return res.status(411).json({
      msg: " invalid token",
    });
  }
  const token = authHeader.split(" ");
  try {
    const decode = jwt.verify(token[1], JWT_SECRET);
    if (decode.userID) {
      req.userID = decode.userID;
      next();
    } else {
      return res.status(403).json({
        error: "invalid token/user",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(403).json({
      error: "invalid token",
    });
  }
}

module.exports = {
  authMiddleware,
};
