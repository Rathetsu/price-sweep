import React from "react";
import Image from "next/image";
import Searchbar from "../components/SearchBar";
import Hero from "../components/Hero";

const Home = () => {
  return (
    <>
      <section className="px-6 md:px-20 py-24 border-2 border-primary">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <p className="small-text">
              Smart Shopping Starts here <br />
              <Image
                src="/assets/icons/arrow-right.svg"
                width={20}
                height={20}
                alt="arrow-right"
              />
            </p>

            <h1 className="head-text">
              Unleash the Power of <br />
              <span className="text-primary">Price Sweep</span>
            </h1>
            <p className="mt-6">
              Powerful, self-serve product matching and price monitoring
            </p>

            <Searchbar />
          </div>

		  <Hero />
        </div>
      </section>

	  <section className='trending-section'>
		<h2 className='section-text'>Trending</h2>
		<div className='flex flex-wrap gap-x-8 gap-y-16'>
			{['Apple Iphone 15', 'Book', 'Sneakers'].map((product, idx) => (
				<div>{product}</div>
			))}
		</div>
	  </section>
    </>
  );
};

export default Home;
