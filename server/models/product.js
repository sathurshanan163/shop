import mongoose from "mongoose";

const review_schema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        rating: {type: Number, required: true},
        comment: {type: String, required: true},
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

const product_schema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        brand: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        reviews: [review_schema],
        rating: {
            type: Number,
            default: 0,
            required: true
        },
        num_of_reviews: {
            type: Number,
            default: 0,
            required: true,
        },
        price: {
            type: Number,
            default: 0,
            required: true
        },
        stock: {
            type: Number,
            default: 0,
            required: true,
        }
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model("Product", product_schema);

export default Product;