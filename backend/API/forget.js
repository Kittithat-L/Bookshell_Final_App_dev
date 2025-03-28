const express = require("express");
const router = express.Router();

const Users = require("../Model/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  const user = await Users.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const token = jwt.sign({ id: user.id }, process.env.SECRET, {
    expiresIn: "1h",
  });
  user.resetToken = token;
  user.resetTokenExpire = Date.now() + 3600000;
  await user.save();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: "Reset Your Password",
    html: `<p>Click <a href="${process.env.CLIENT_URL}/reset-password/${token}">here</a> to reset your password.</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return res.status(500).json({ message: "Error sending mail" });
    res.json({ message: "Reset link sent to your email" });
  });
});

router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await Users.findOne({
      _id: decoded.id,
      resetToken: token,
      resetTokenExpire: {
        $gt: Date.now(),
      },
    });
    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    user.password = await bcrypt.hash(password, 10);
    user.resetToken = "";
    user.resetTokenExpire = null;
    await user.save();

    res.status(200).json({ message: "Password reset successful!" });
  } catch (error) {
    return res.status(400).json({ message: "Invalid token" });
  }
});

module.exports = router;
