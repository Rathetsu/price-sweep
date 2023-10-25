import React from "react";
import Image from "next/image";
import { Inter, Space_Grotesk } from "next/font/google";
import Searchbar from "../components/SearchBar";
import Hero from "../components/Hero";
import { getAllProducts } from "../lib/actions";
import ProductCard from "../components/ProductCard";

const inter = Inter({ subsets: ["latin"] });

const Home = async () => {
    const allProducts = await getAllProducts();

    return (
        <>
            <section className="px-6 md:px-20 py-24">
                <div className="flex max-xl:flex-col gap-16">
                    <div className="flex flex-col justify-center">
                        <p className="small-text">
                            Smart Shopping Starts here
                            <Image
                                src="/assets/icons/arrow-right.svg"
                                width={20}
                                height={20}
                                alt="arrow-right"
                            />
                        </p>

                        <h1 className="head-text">
                            <span className={`${inter.className} text-primary`}>
                                Price Sweep
                            </span>
                            <br /> Track, Compare & Save on Your Favorite
                            Products!
                        </h1>
                        <p className="mt-6">
                            Paste a product link and instantly find the best
                            deals and comparisons.
                        </p>

                        <Searchbar />
                    </div>

                    <Hero />
                </div>
            </section>

            <section className="trending-section">
                <h2 className="section-text">Trending</h2>
                <div className="flex flex-wrap gap-x-8 gap-y-16">
                    {allProducts?.map((product, idx) => (
                        <ProductCard key={idx} product={product} />
                    ))}
                </div>
            </section>
        </>
    );
};

export default Home;
