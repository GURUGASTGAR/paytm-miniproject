const express = require("express");
const router = express.Router();
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

const signupSchema = zod.object({
  username: zod.string().email(),
  password: zod.string().min(6),
  firstname: zod.string(),
  lastname: zod.string(),
});

router.post("/signup", async (req, res) => {
  //   const body = req.body;
  try {
    const { success } = signupSchema.safeParse(req.body); // we can also do const success = signupSchema.safeparse(req.body).success
    const person = await User.findOne({
      username: req.body.username,
    });
    if (!success) {
      return res.status(411).json({
        msg: "incorrect-input",
      });
    }

    if (person) {
      return res.status(411).json({
        msg: "user already exists",
      });
    }

    const dbUser = await User.create(req.body);

    const userID = dbUser._id;

    await Account.create({
      userID,
      balance: 1 + Math.random() * 100000,
    });

    const token = jwt.sign({ userID }, JWT_SECRET);

    res.status(200).json({
      msg: "user created Succesfully",
      token: token,
    });
  } catch (e) {
    console.log(e);
  }
});

const signinSchema = zod.object({
  username: zod.string().email(),
  password: zod.string().min(6),
});

router.post("/signin", async (req, res) => {
  const { success } = signinSchema.safeParse(req.body);
  const person = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });
  if (!success) {
    return res.status(411).json({
      msg: "incorrect-input",
    });
  }

  if (!person) {
    return res.status(411).json({
      msg: "user does not exist",
    });
  }
  const userID = person._id;
  const token = jwt.sign({ userID }, JWT_SECRET);
  res.json({
    msg: "signin successfull",
    token: token,
  });
});
const updateSchema = zod.object({
  firstname: zod.string(),
  lastname: zod.string(),
  password: zod.string().min(6),
});
router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateSchema.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      msg: "invalid inputs",
    });
  }
  const user = await User.updateOne({ _id: req.userID }, { $set: req.body });
  console.log(req.body);
  res.json({
    msg: "changes updated succesfully",
  });
});
router.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";
  const userId = req.userID;
  const users = await User.find({
    $or: [
      {
        firstname: {
          $regex: filter,
        },
      },
      {
        lastname: {
          $regex: filter,
        },
      },
    ],
  });
  res.json({
    userId: userId,
    user: users.map((user) => ({
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      _id: user._id,
    })),
  });
});

module.exports = router;
