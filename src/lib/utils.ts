export function extractPrice($: any): string {
	const currencySymbol = $(".a-price-symbol:first").text().trim();
	const priceWhole = $(".a-price-whole:first").text().trim()
		.replace('.', ''); // remove decimal dot from whole price if it exists
	const priceFraction = $(".a-price-fraction:first").text().trim();

	return `${currencySymbol} ${priceWhole}.${priceFraction}`;
}
