import User from "../models/userSchema.js";
import bcrypt from 'bcryptjs';

export const testController = (req, res) => {
    res.send('Hello Auth')
}

const handleErrors = (err) => {
    console.log(err.message)
    let errors = {email: '', password: ''}

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

    return errors
}

export const signupController = async (req, res) => {
    try {
            const user = new User({
                username: req.body.username,
                password: req.body.password,
                email: req.body.email
            })            

            await user.save()
            res.json(user)
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
                res.json({message: "Logged in successfully"})
            }else {
                res.json({message: "Invalid credentials"})
            }
        }else {
            res.json({message: "User not found"})
        }
    } catch (error) {
        res.status(400).json({message: "Something went wrong"})
    }
}