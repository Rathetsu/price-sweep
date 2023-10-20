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
	
	const originalPriceText = originalAmount ? `${originalAmount}` : null;


	// Current Price
	const priceWhole = $(".a-price-whole:first").text().trim().replace(".", ""); // remove decimal dot from whole price if it exists
	const priceFraction = $(".a-price-fraction:first").text().trim();
	const currentPriceText = `${priceWhole}.${priceFraction}`;

	return {
		originalPrice: originalPriceText,
		currentPrice: currentPriceText,
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