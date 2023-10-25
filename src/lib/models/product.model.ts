import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        url: { type: String, required: true, unique: true },
        title: { type: String, required: true },
        category: { type: String },
        reviewsCount: { type: Number },
        rating: { type: Number },
        description: { type: String },
        currency: { type: String, required: true },
        isOutOfStock: { type: Boolean, default: false },
        discountRate: { type: Number },
        mainImage: { type: String, required: true },
        images: { type: [String], required: true },
        priceHistory: [
            {
                price: { type: Number, required: true },
                date: { type: Date, default: Date.now },
            },
        ],
        originalPrice: { type: Number, required: true },
        currentPrice: { type: Number, required: true },
        lowestPrice: { type: Number },
        highestPrice: { type: Number },
        averagePrice: { type: Number },
        users: [{ email: { type: String, required: true } }],
        default: [],
    },
    { timestamps: true }
);

export const Product =
    mongoose.models.Product || mongoose.model("Product", productSchema);
