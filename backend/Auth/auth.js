const express = require('express');
const router = express.Router();
const User = require('../Model/users.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const authMiddleware = require('../Middleware/authMiddleware.js');
dotenv.config({path:'./.env.local'});
const secret = process.env.SECRET;

router.post('/register', async (req, res , next) => {
    try {
        const {email , username , password , telephone} = req.body;
        if (!email || !username || !password || !telephone) {
            return res.status(400).json({
                message : 'Please fill all the fields'
            });
        }
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(409).json({ message: 'Username already exists' });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            username,
            password : hashedPassword,
            telephone
        });
        await newUser.save();
        res.status(201).json({message : 'User created successfully'});
    }
    catch(e){
        next(e);
    }
});

router.post('/login', async (req, res , next) => {
    try {
        const {email , password} = req.body;
        const existingUser = await User.findOne({email:req.body.email});
        if(!existingUser) {
            return res.status(400).json({
                message : 'Invalid credentials'
            });
        }
        const isPassWordCorrect = await bcrypt.compare(req.body.password, existingUser.password);
        if(!isPassWordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const { password: userPassword, ...userWithoutPassword } = existingUser.toObject();
        const token = jwt.sign({ id: existingUser._id }, secret, { expiresIn: '1d' });
        res.status(200).json({result : userWithoutPassword , token});
    }catch(e){
        next(e);
    }
});

router.post('/logout', authMiddleware, async (req, res) => {
    try {
        res.status(200).json({
            message: "User logged out successfully!",
            token: null
        });
    } catch (e) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


router.post('/check-user', async (req, res, next) => {
    try {
        const { username, email } = req.body;

        if (!username && !email) {
            return res.status(400).json({ message: 'Username or email is required' });
        }

        if (username) {
            const existingUsername = await User.findOne({ username });
            if (existingUsername) {
                return res.status(409).json({ message: 'Username already exists' });
            }
        }

        if (email) {
            const existingEmail = await User.findOne({ email });
            if (existingEmail) {
                return res.status(409).json({ message: 'Email already exists' });
            }
        }

        res.status(200).json({ message: 'Username and email are available' });
    } catch (e) {
        next(e);
    }
});
//Logout ต้องลบ Token หน้าบ้านด้วย
module.exports = router;
