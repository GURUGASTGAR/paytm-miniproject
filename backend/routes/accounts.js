const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Account } = require("../db");
const { authMiddleware } = require("../middleware");
//const zod = require("zod");

router.get("/balance", authMiddleware, async (req, res) => {
  const userAccount = await Account.findOne({ userID: req.userID });

  res.json({
    balance: userAccount.balance,
  });
});

// const transferSchema = zod.object({
//   amount:Number,
//   to:String,
// })
router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  //   const { success } = transferSchema.safeParse(req.body);
  //   if(!success){
  //      res.status(411).json({
  //       msg:"invalid amount input"
  //     })
  // }
  const { amount, to } = req.body;
  //fetch the account within the transaction

  const account = await Account.findOne({ userID: req.userID }).session(
    session
  );
  if (!account || account.balance < amount) {
    return res.status(400).json({
      msg: "insufficient balance",
    });
  }

  const toAccount = await Account.findOne({ userID: to }).session(session);
  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      msg: "invalid account",
    });
  }

  //performing the transfer
  await Account.updateOne(
    { userID: req.userID },
    {
      $inc: {
        balance: -amount,
      },
    }
  ).session(session);
  await Account.updateOne(
    { userID: to },
    {
      $inc: { balance: amount },
    }
  ).session(session);

  //comit the transaction
  await session.commitTransaction();
  res.json({
    msg: "transfer succesfully",
  });
});

module.exports = router;
