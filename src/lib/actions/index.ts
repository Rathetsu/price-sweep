"use server";

import { scrapeAmazonProduct } from "../scraper";

export async function scrapeAndStoreProduct(productUrl: string) {
	console.log("scrapeAndStoreProduct", productUrl);
	if (!productUrl) return;
	try {
		const scrapedProduct = await scrapeAmazonProduct(productUrl);
	} catch (e: any) {
		console.log(e);
		throw new Error(`Failed to create/update product: ${e.message}`);
	}
}
