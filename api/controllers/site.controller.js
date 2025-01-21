import { Menu } from "../models/menuSchema.js";

export const getSiteController = async (req, res) => {
    try {
        const url = req.params.url;

        const site = await Menu.findOne({ url, isPublic: true })

        if(!site) {
            return res.status(404).json({ error: 'Site not found' });
        }

        res.status(200).json(site);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }  
}