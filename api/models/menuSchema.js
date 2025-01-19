import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
    },
    description: {
        type: String,
        default: "",
    },
    imageUrl: {
        type: String,
        default: "",
    },
    category: {
        type: String,
        required: [true, "Category is required"],
    },
})

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    items: [itemSchema],
})

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
    imageUrl: {
        type: String,
        default: "",
    },
    categories: {
        type: [categorySchema],
        default: []
    },
})

export const Menu = mongoose.model("Menu", menuSchema);