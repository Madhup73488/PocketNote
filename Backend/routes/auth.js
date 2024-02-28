const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/getuser');

const JWT_SECRET = 'madhuisanengineeringstudent$123';

router.post(
    '/createuser',
    [
        body('name').isLength({ min: 3 }).withMessage('Enter a valid Name'),
        body('email').isEmail().withMessage('Enter a valid EmailId'),
        body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters'),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            let success = false;

            if (!errors.isEmpty()) {
                return res.status(400).json({ success, errors: errors.array() });
            }
            const { name, email, password } = req.body;
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ success, error: "Sorry a user with this email already exists" });
            }
            success = true;
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            user = new User({
                name, email, password: hashedPassword,
            });
            await user.save();
            const data = {
                user: { id: user.id }
            };
            const token = jwt.sign(data, JWT_SECRET, { expiresIn: '1h' });
            res.json({ success: true, token });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error Occurred");
        }
    }
);

router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Enter a valid EmailId'),
        body('password').exists().withMessage('password cannot be blank'),
    ],
    async (req, res) => {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { email, password } = req.body;
            let user = await User.findOne({ email });

            if (!user) {
                success = false;
                return res.status(400).json({ error: "Please try to login with correct credentials" });
            }

            const comparepassword = await bcrypt.compare(password, user.password);
            if (!comparepassword) {
                success = false;
                return res.status(400).json({ success, error: "Please try to login with correct credentials" });
            }

            const data = {
                user: { id: user.id }
            };
            jwt.sign(data, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
                if (err) throw err;
                success = true;
                res.json({ success, token });
            });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error Occurred");
        }
    }
);

router.post(
    '/getUser', fetchuser,
    async (req, res) => {
        try {
            let userId = req.user.id;
            const user = await User.findOne({ _id: userId }).select("-password");
            res.send(user);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error Occurred");
        }
    }
);

module.exports = router;
