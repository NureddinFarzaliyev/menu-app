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

        if (!menu) {
            return res.status(400).json({ error: "Menu not created" })
        }

        res.json({ menu, success: true })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteMenuController = async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.menuId);

        if (!menu) {
            return res.status(404).json({ error: "Menu not found" })
        }

        if (menu.ownerId !== req.userId) {
            return res.status(404).json({ error: "Menu not found (unauthorized)" })
        }

        await Menu.findByIdAndDelete(req.params.menuId);

        res.json({ success: true, message: "Menu deleted" })

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

export const editMenuController = async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.menuId);

        if (!menu) {
            return res.status(404).json({ error: "Menu not found" })
        }

        if (menu.ownerId !== req.userId) {
            return res.status(404).json({ error: "Menu not found (unauthorized)" })
        }

        const updatedMenu = await Menu.findByIdAndUpdate(req.params.menuId, req.body, { new: true });

        res.json({ updatedMenu, success: true })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getUserMenusController = async (req, res) => {
    try {
        const menus = await Menu.find({ ownerId: req.userId });

        if (!menus) {
            return res.status(404).json({ error: "Menus not found" })
        }

        res.json({ menus, success: true })

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getUserMenuController = async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.menuId);

        if (!menu) {
            return res.status(404).json({ error: "Menu not found" })
        }

        if (menu.ownerId !== req.userId) {
            return res.status(404).json({ error: "Menu not found (unauthorized)" })
        }

        res.json({ menu, success: true })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}