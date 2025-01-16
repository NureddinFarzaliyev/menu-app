import { Menu } from "../models/menuSchema.js"
import User from "../models/userSchema.js";

export const createMenuController = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }

        const menu = await Menu.create({
            ownerId: req.userId,
            name: req.body.name,
        })
        
        if(!menu){
            return res.status(400).json({error: "Menu not created"})
        }

        res.json({menu, success: true})

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const getUserMenusController = async (req, res) => {

    const menus = await Menu.find({ ownerId: req.userId });

    if(!menus) {
        return res.status(404).json({error: "Menus not found"})
    }

    res.json({menus, success: true})
}