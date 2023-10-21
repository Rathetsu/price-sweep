"use server";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { scrapeAmazonProduct } from "../scraper";
import { connectToDB } from "../mongoose";

export async function scrapeAndStoreProduct(productUrl: string) {
	if (!productUrl) return;
	try {
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

		try {
			connectToDB();
		} catch (e: any) {
			throw new Error(`Failed to connect to database: ${e.message}`);
		}
	} catch (e: any) {
		console.log(e);
		throw new Error(`Failed to create/update product: ${e.message}`);
	}
}
