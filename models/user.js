const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Email invalide.']
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"], //, "client" has been removed will be added when hec administrator gives permission
                                 // user is the simple user or site's visitor
        default: "user"
    },
    isActive: {
        type: Boolean,
        default: false
    },
},
    {
        timestamps: true
    },
    );
module.exports = mongoose.model('User', userSchema);