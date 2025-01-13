import User from "../models/userSchema.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const testController = (req, res) => {
    res.send('Hello Auth')
}

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: maxAge,
    })
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
        const user = await User.create({username: req.body.username, password: req.body.password, email: req.body.email})
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
        res.json({user: user._id})
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
                const token = createToken(existingUser._id)
                res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
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
    res.cookie('jwt', '', {maxAge: 1})
    res.send({message: "User logged out"})
}