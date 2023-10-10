const User = require('../models/User');

exports.register = async function (req, res) {
    const { username, email, password } = req.body;

    try{
        const user = await User.create({
            username, 
            email,
            password
        });

        res.status(201).json({
            success: true,
            user,
        });
        // next();
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
    
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password) {
        res.status(400).json({ success: false, error:"Please provide email and password"})
    }

    try {
        const user = await User.findOne ({ email }).select("+password");

        if(!user) {
            res.status(404).json({ success: false, error:"Invalid credentials"})
        }

        const isMatch = await user.matchPasswords(password);

        if(!isMatch) {
            res.status(404).json({success:false, error: "Invalid credentials"})
        }
        res.status(200).json({
            success: true,
            token : "keyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
        });
    }catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
};

exports.forgotpassword = (req, res, next) => {
    res.send("Forgot Password Route");
};
exports.resetpassword = (req, res, next) => {
    res.send("Reset Password Route");
};