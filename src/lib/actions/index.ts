"use server";

import { revalidatePath } from "next/cache";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { scrapeAmazonProduct } from "../scraper";
import { connectToDB } from "../mongoose";
import { Product } from "../models/product.model";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";

export async function scrapeAndStoreProduct(productUrl: string) {
    if (!productUrl) return;
    try {
        await connectToDB();

        const scrapedProduct = await scrapeAmazonProduct(productUrl);

        if (!scrapedProduct) {
            throw new Error("Failed to scrape product");
            return;
        }

        if (scrapedProduct.isRange) {
            console.log("Product contains a price range");
            toast.error(
                "The product contains a price range. Probably because it has multiple versions. Please choose a specific version so we can provide better service.",
                {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: "colored",
                    style: {
                        backgroundColor: "#E65728",
                        color: "#fff",
                    },
                }
            );
            return;
        }

        let product = scrapedProduct;

        const existingProduct = await Product.findOne({
            url: scrapedProduct.url,
        });

        if (existingProduct) {
            const updatedPriceHistory: any = [
                ...existingProduct.priceHistory,
                {
                    price: scrapedProduct.currentPrice,
                    date: new Date(),
                },
            ];

            product = {
                ...scrapedProduct,
                priceHistory: updatedPriceHistory,
                lowestPrice: getLowestPrice(updatedPriceHistory),
                highestPrice: getHighestPrice(updatedPriceHistory),
                averagePrice: getAveragePrice(updatedPriceHistory),
            };
        }

        const newProduct = await Product.findOneAndUpdate(
            { url: scrapedProduct.url },
            product,
            { upsert: true, new: true }
        );

        revalidatePath(`/product/${newProduct._id}`);
    } catch (e: any) {
        console.log(e);
        throw new Error(`Failed to create/update product: ${e.message}`);
    }
}

export async function getProductById(productId: string) {
    try {
        connectToDB();
        const product = await Product.findOne({ _id: productId });
        if (!product) return null;
        return product;
    } catch (error: any) {
        console.log(error);
        // throw new Error(`Failed to get product: ${error.message}`);
    }
}

export async function getAllProducts() {
    try {
        connectToDB();
        const products = await Product.find({});
        if (!products) return null;
        return products;
    } catch (error: any) {
        console.log(error);
        // throw new Error(`Failed to get product: ${error.message}`);
    }
}

export async function getSimilarProducts(productId: string) {
    try {
        connectToDB();

        const currentProduct = await Product.findById(productId);

        if (!currentProduct) return null;

        const similarProducts = await Product.find({
            _id: { $ne: productId },
        }).limit(3);

        return similarProducts;
    } catch (error) {
        console.log(error);
    }
}
