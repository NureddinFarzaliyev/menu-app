import { Menu } from "../models/menuSchema.js"

export const createCategoryController = async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.menuId)

        console.log(req.params.menuId)

        if(!menu) {
            return res.status(404).json({error: "Menu not found"})
        }

        if(req.userId !== menu.ownerId) {
            return res.status(401).json({error: "Menu not found (unauthorized)"})
        }

        if(menu.categories.every(category => category.name !== req.body.category)) {
            menu.categories.push({name: req.body.category})
            await menu.save();
            res.json({message: "Category created successfully"})
        }else{
            return res.status(400).json({error: "Category already exists"})
        }

    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const editCategoryController = async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.menuId)

        if(!menu) {
            return res.status(404).json({error: "Menu not found"})
        }

        if(req.userId !== menu.ownerId) {
            return res.status(401).json({error: "Menu not found (unauthorized)"})
        }

        if(menu.categories.every(category => category.name !== req.body.category)) {
            const category = menu.categories.id(req.params.categoryId)
            category.name = req.body.category

            await menu.save();
            res.json({message: "Category edited successfully"})
        }else{
            return res.status(400).json({error: "Category already exists"})
        }

    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const deleteCategoryController = async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.menuId)

        if(!menu) {
            return res.status(404).json({error: "Menu not found"})
        }

        if(req.userId !== menu.ownerId) {
            return res.status(401).json({error: "Menu not found (unauthorized)"})
        }

        menu.categories = menu.categories.filter(category => category._id.toString() !== req.params.categoryId)

        await menu.save();

        res.json({message: "Category deleted successfully", success: true})

    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const createItemController = async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.menuId)

        if(!menu) {
            return res.status(404).json({error: "Menu not found"})
        }

        if(req.userId !== menu.ownerId) {
            return res.status(401).json({error: "Menu not found (unauthorized)"})
        }

        const category = menu.categories.id(req.params.categoryId)

        if(!category) {item
            return res.status(404).json({error: "Category not found"})
        }

        category.items.push({...req.body})
        await menu.save();
        res.json({message: "Item created successfully"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const editItemController = async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.menuId)

        if(!menu) {
            return res.status(404).json({error: "Menu not found"})
        }

        if(req.userId !== menu.ownerId) {
            return res.status(401).json({error: "Menu not found (unauthorized)"})
        }

        const category = menu.categories.id(req.params.categoryId)

        if(!category) {
            return res.status(404).json({error: "Category not found"})
        }

        let item = category.items.id(req.params.itemId)

        if(!item) {
            return res.status(404).json({error: "Item not found"})
        }

        Object.assign(item, req.body)

        await menu.save();
        res.json({message: "Item edited successfully"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const deleteItemController = async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.menuId)

        if(!menu) {
            return res.status(404).json({error: "Menu not found"})
        }

        if(req.userId !== menu.ownerId) {
            return res.status(401).json({error: "Menu not found (unauthorized)"})
        }

        const category = menu.categories.id(req.params.categoryId)

        if(!category) {
            return res.status(404).json({error: "Category not found"})
        }

        category.items = category.items.filter(item => item._id.toString() !== req.params.itemId)
        
        await menu.save();
        res.json({message: "Item deleted successfully"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}