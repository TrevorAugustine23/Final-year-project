const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
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
        next(error);
    }
    
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return next(new ErrorResponse("Please provide and email and password", 400))
    }

    try {
        const user = await User.findOne ({ email }).select("+password");

        if(!user) {
            return next(new ErrorResponse("Invalid credentials", 401))
        }

        const isMatch = await user.matchPasswords(password);

        if(!isMatch) {
            return next(new ErrorResponse("Invalid credentials", 401))
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