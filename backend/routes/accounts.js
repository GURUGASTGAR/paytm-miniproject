const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Account } = require("../db");
const { authmiddleware } = require("../middleware");

router.get("/balance", authmiddleware, async (req, res) => {
  const userAccount = await Account.findOne({ userID: req.userID });

  res.json({
    balance: userAccount.balance,
  });
});
router.post("/transfer", authmiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
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
