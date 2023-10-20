import axios from "axios";
import * as cheerio from "cheerio";
import { extractPrice, extractImages } from "../utils";

export async function scrapeAmazonProduct(url: string) {
	if (!url) return;

	// BrightData proxy configuration
	const username = String(process.env.BRIGHT_DATA_USERNAME);
	const password = String(process.env.BRIGHT_DATA_PASSWORD);
	const port = 22225;
	const session_id = (1000000 * Math.random()) | 0;
	const options = {
		auth: {
			username: `${username}-session-${session_id}`,
			password,
		},
		host: "brd.superproxy.io",
		port,
		rejectUnauthorized: false,
	};

	try {
		const response = await axios.get(url, options);
		const $ = cheerio.load(response.data);

		// Extract product data
		const title = $("#productTitle").text().trim();
		const currency = $(".a-price-symbol:first").text().trim();
		const prices = extractPrice($);
		const isOutOfStock: boolean =
			$(
				"#availability .a-size-medium.a-color-success:contains('Currently unavailable.')"
			).length > 0;
		console.log("title", title);
		console.log("original price", prices.originalPrice);
		console.log("current price", prices.currentPrice);
		console.log("currency", currency);
		console.log("is out of stock", isOutOfStock);

		// Extract image data
		const extractedImages = extractImages($);
		console.log("Extracted images:", extractedImages);
	} catch (e: any) {
		throw new Error(`Failed to scrape product: ${e.message}`);
	}
}
