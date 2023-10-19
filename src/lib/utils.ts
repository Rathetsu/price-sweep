interface PriceDetails {
	originalPrice: string | null;
	currentPrice: string;
}

export function extractPrice($: any): PriceDetails {
	const productCurrency = $(".a-price-symbol:first").text().trim();

	// Original Price
	const originalAmount = $(
		".a-price.a-text-price:first span[aria-hidden='true']"
	)
		.text()
		.trim()
		.replace(productCurrency, "");
	
	const originalPriceText = originalAmount ? `${productCurrency} ${originalAmount}` : null;


	// Current Price
	const priceWhole = $(".a-price-whole:first").text().trim().replace(".", ""); // remove decimal dot from whole price if it exists
	const priceFraction = $(".a-price-fraction:first").text().trim();
	const currentPriceText = `${productCurrency} ${priceWhole}.${priceFraction}`;

	return {
		originalPrice: originalPriceText,
		currentPrice: currentPriceText,
	};
}
