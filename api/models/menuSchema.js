import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
    ownerId: {
        type: String,
        required: [true, "Owner ID is required"],
    },
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    url: {
        type: String,
        default: "",
    },
    cover: {
        type: String,
        default: "",
    }
})

export const Menu = mongoose.model("Menu", menuSchema);