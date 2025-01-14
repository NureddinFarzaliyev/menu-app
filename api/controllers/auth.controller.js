import User from "../models/userSchema.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

export const testController = (req, res) => {
    res.send('Hello Auth')
}

const maxAge = 3 * 24 * 60 * 60;

const createToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: maxAge,
    })
}

const sendVerificationEmail = async (email, token) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    })

    const sent = await transporter.sendMail({
        from: process.env.SMTP_SENDER,
        to: email,
        subject: "Verify your email",
        text: `Click this link to verify your email: ${process.env.CLIENT_ORIGIN}/verify/${token}`
    })

    console.log(sent.messageId)
}

const handleErrors = (err) => {
    console.log(err.message)
    let errors = {email: '', password: '', credentials: ''}

    // Duplicate Key errors
    if(err.code === 11000) {
        errors.email = "Email is already registered"
        return errors;
    }

    // Validation Errors
    if(err.message.includes('User validation failed')){
        Object.values(err.errors).forEach(err => {
            errors[err.properties.path] = err.properties.message
        })
        console.log(errors)
    }

    // Login Errors
    if(err.message === "Invalid email or password") {
        errors.credentials = err.message
    }

    return errors
}

export const signupController = async (req, res) => {
    try {
        // create user
        const user = await User.create({username: req.body.username, password: req.body.password, email: req.body.email})
        const token = createToken({id: user._id})
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000, sameSite: 'None', secure: true})
        res.json({user: user._id})

        const emailToken = createToken({email: user.email})
        sendVerificationEmail(user.email, emailToken)
    } catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({errors})
    }
}

export const loginController = async (req, res) => {
    try {
        const existingUser = await User.findOne({email: req.body.email})
    
        if(existingUser) {
            const pass = await bcrypt.compare(req.body.password, existingUser.password)
    
            if(pass) {
                const token = createToken({id: existingUser._id})
                res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000, sameSite: 'None', secure: true})
                res.json({user: existingUser._id})

            }else {
                throw new Error("Invalid email or password");
            }
        }else {
            throw new Error("Invalid email or password");
        }
    } catch (error) {
        const errors = handleErrors(error)
        res.status(400).json({errors})
    }
}

export const logoutController = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1, sameSite: 'None', secure: true})
    res.send({message: "User logged out"})
}

export const verificationController = async (req, res) => {
    try {
        const token = req.body.token;

        if(!token){
            return res.status(401).json({verified: false, message: "No token provided"})
        }

        jwt.verify(token, process.env.JWT_SECRET, async (err, verified) => {
            if(err) {return res.status(401).json({verified: false, message: "Invalid token"})}

            const user = await User.findOne({email: verified.email})

            if(!user) {return res.status(401).json({verified: false, message: "User not found"})}
            if(user.verified){return res.status(401).json({verified: false, message: "User already verified"})}

            await user.updateOne({verified: true})
            res.status(200).json({verified: true, message: "User verified"})
        })
    } catch (error) {
        res.status(500).json({verified: false, message: "Server Error"})
    }
}