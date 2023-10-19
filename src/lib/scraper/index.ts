import axios from "axios";
import * as cheerio from "cheerio";
import { extractPrice } from "../utils";

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
		const currentPrice = extractPrice($);
		console.log({ title, currentPrice });

		
	} catch (e: any) {
		throw new Error(`Failed to scrape product: ${e.message}`);
	}
}
