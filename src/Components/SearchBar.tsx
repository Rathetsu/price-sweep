"use client";

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { scrapeAndStoreProduct } from "../lib/actions";

type SearchBarProps = {};

const SearchBar: React.FC<SearchBarProps> = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const isValidAmazonProductURL = (url: string) => {
		try {
			const urlObj = new URL(url);
			const hostname = urlObj.hostname;
			const pathname = urlObj.pathname;
			const isAmazon = hostname.includes("amazon");
			const isProduct = pathname.includes("dp");
			return isAmazon && isProduct;
		} catch {
			return false;
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const isValidLink = isValidAmazonProductURL(searchQuery);
		if (!isValidLink) {
			console.log("invalid link");
			toast.error("Invalid Amazon Product Link", {
				position: "top-center",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				theme: "colored",
				style: {
					backgroundColor: "#E65728",
					color: "#fff",
				},
			});
			return;
		}
		try {
			setIsLoading(true);
			// Scrape the product page
			const product = await scrapeAndStoreProduct(searchQuery);
			
		} catch (e) {
			console.log(e);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
			<input
				type="text"
				className="searchbar-input"
				placeholder="Enter an Amazon product link"
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
			/>
			<button
				type="submit"
				disabled={searchQuery.length === 0 || isLoading}
				className="searchbar-btn"
			>
				{isLoading ? "Searching..." : "Search"}
			</button>
			<ToastContainer />
		</form>
	);
};

export default SearchBar;
