//Register . /register
//*ActivateUserAccount*  : /status/edit
//GetAll : /
//Login : /login

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');




// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role, avatar } = req.body;

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: "Account already exists !" });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hash,
            role,
            avatar
        });

        await newUser.save();
        res.status(201).json({ success: true, message: 'User registered successfully.', user: newUser });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

/*
// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role, avatar } = req.body;

        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: "Account already exists !" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            name,
            email,
            password: hash,
            role,
            avatar,
            //isActive: false // Set isActive to false by default
        });

        // Save the user to the database
        await newUser.save();

        // Return success response
        res.status(201).json({ success: true, message: 'User registered successfully.', user: newUser });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Activate user account
/*router.get('/status/edit', async (req, res) => {
    try {
        const email = req.query.email;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found !" });
        }

        user.isActive = true;
        await user.save();

        res.json({ success: true, message: "Account activated successfully." });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});
*/




// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Login user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required !" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "Account doesn't exist !" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials !' });
        }

        // Return user data without tokens
        res.status(200).json({
            success: true,
            user,
            //isActive: user.isActive
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Update user by ID
router.put('/:id', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        let updatedFields = { name, email, role };

        // If password is provided, hash it
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updatedFields.password = await bcrypt.hash(password, salt);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, updatedFields, { new: true, runValidators: true }).select("-password");

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        res.status(200).json({ success: true, message: "User updated successfully.", user: updatedUser });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Delete user by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ success: false, message: "User not found." });
        }
        res.status(200).json({ success: true, message: "User deleted successfully." });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});


module.exports = router;