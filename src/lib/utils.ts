interface PriceDetails {
	isRange: boolean;
	priceRangeStart: string | null;
	priceRangeEnd: string | null;
	originalPrice: string | null;
	currentPrice: string | null;
	productCurrency: string;
}

export function extractPrice($: any): PriceDetails {
	const isRange = $(".a-price-range").length > 0;

	let originalPriceText = null;
	let currentPriceText = null;
	let productCurrency = "";
	let priceRangeStart = null;
	let priceRangeEnd = null;

	if (isRange) {
		const offscreenPrices = $(".a-price-range span.a-offscreen");
		if (offscreenPrices.length >= 2) {
			const firstPriceText = $(offscreenPrices[0]).text().trim();
			const secondPriceText = $(offscreenPrices[1]).text().trim();
			productCurrency = firstPriceText.replace(/[0-9.,]/g, "");
			priceRangeStart = firstPriceText.replace(productCurrency, "");
			priceRangeEnd = secondPriceText.replace(productCurrency, "");
			currentPriceText = `${priceRangeStart} - ${priceRangeEnd}`;
		}
	} else {
		productCurrency = $(".a-price-symbol:first").text().trim();
		const originalAmount = $(
			".a-price.a-text-price:first span[aria-hidden='true']"
		)
			.text()
			.trim()
			.replace(productCurrency, ""); // remove currency symbol from original price if it exists

		originalPriceText = originalAmount ? `${originalAmount}` : null;

		const priceWhole = $(".a-price-whole:first")
			.text()
			.trim()
			.replace(".", ""); // remove decimal dot from whole price if it exists
		const priceFraction = $(".a-price-fraction:first").text().trim();
		currentPriceText = `${priceWhole}.${priceFraction}`;
	}

	return {
		isRange,
		priceRangeStart,
		priceRangeEnd,
		originalPrice: originalPriceText,
		currentPrice: currentPriceText,
		productCurrency,
	};
}

export function extractImages($: any): string[] {
	const scripts = $('script[type="text/javascript"]').toArray();
	const imageScript = scripts.find((script: any) =>
		$(script).html()?.includes("colorImages")
	);
	if (!imageScript) throw new Error("Image data script not found.");

	const scriptContent = $(imageScript).html();
	const matched = scriptContent?.match(
		/'colorImages':\s*{\s*'initial':\s*(\[\{.*?\}\])/
	);
	if (!matched)
		throw new Error("Failed to extract image data from the script.");

	const imageData = JSON.parse(matched[1]);
	const extractedImages: string[] = [];

	imageData.forEach((item: any) => {
		if (item.hiRes) {
			extractedImages.push(item.hiRes);
		} else if (item.main) {
			const mainImages = Object.keys(item.main);
			const highestResImage = mainImages.sort((a, b) => {
				const resA = a.includes("_AC_SX")
					? parseInt(a.split("_AC_SX")[1].split(".")[0], 10)
					: 0;
				const resB = b.includes("_AC_SX")
					? parseInt(b.split("_AC_SX")[1].split(".")[0], 10)
					: 0;
				return resB - resA; // sort in descending order
			})[0];
			if (highestResImage) extractedImages.push(highestResImage);
		}
	});

	return extractedImages;
}

export function getLowestPrice(priceHistory: any[]): number {
	const prices = priceHistory.map((price: any) => price.price);
	return Math.min(...prices);
}

export function getHighestPrice(priceHistory: any[]): number {
	const prices = priceHistory.map((price: any) => price.price);
	return Math.max(...prices);
}

export function getAveragePrice(priceHistory: any[]): number {
	const prices = priceHistory.map((price: any) => price.price);
	return prices.reduce((a, b) => a + b, 0) / prices.length;
}
