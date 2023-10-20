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
		const priceDetails = extractPrice($);
		const isOutOfStock: boolean =
			$(
				"#availability .a-size-medium.a-color-success:contains('Currently unavailable.')"
			).length > 0;
		const discountRate = $(
			".a-size-large.savingPriceOverride.reinventPriceSavingsPercentageMargin.savingsPercentage"
		)
			.text()
			.trim();
		const extractedImages = extractImages($);

		// construct data object with scraped data
		const data = {
			url,
			title,
			category: "",
			reviewsCount: 0,
			rating: 0,
			description: "",
			currency: priceDetails.productCurrency,
			isOutOfStock,
			discountRate: Number(discountRate),
			mainImage: extractedImages[0],
			images: extractedImages,
			priceHistory: [],
			originalPrice: priceDetails.originalPrice ? Number(priceDetails.originalPrice) : null,
			currentPrice: priceDetails.isRange ? null : Number(priceDetails.currentPrice),
			startPrice: priceDetails.isRange ? Number(priceDetails.startPrice) : null,
			endPrice: priceDetails.isRange ? Number(priceDetails.endPrice) : null,
		};

		console.log('Scraped Amazon product data:', data);

		return data;

	} catch (e: any) {
		throw new Error(`Failed to scrape product: ${e.message}`);
	}
}
