"use client";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

type HeroProps = {};

const heroImages = [
  { imgUrl: "/assets/images/hero-1.svg", alt: "smart watch" },
  { imgUrl: "/assets/images/hero-2.svg", alt: "bag" },
  { imgUrl: "/assets/images/hero-3.svg", alt: "lamp" },
  { imgUrl: "/assets/images/hero-4.svg", alt: "air fryer" },
  { imgUrl: "/assets/images/hero-5.svg", alt: "chair" },
];

const Hero: React.FC<HeroProps> = () => {
  return (
	<div
		className='hero-carousel'
	>
    <Carousel
      showThumbs={false}
      autoPlay
      infiniteLoop
      interval={2000}
      showArrows={false}
      showStatus={false}
    >
      {heroImages.map((image, idx) => (
        <Image
          src={image.imgUrl}
          alt={image.alt}
          key={idx}
          width={500}
          height={500}
          className="object-contain"
        />
      ))}
    </Carousel>

	<Image
		src='assets/icons/hand-drawn-arrow.svg'
		width={200}
		height={200}
		alt='arrow'
		className='max-xl:hidden z-0 absolute bottom-0 right-0 -left-[20%]'
	/>
	</div>
  );
};
export default Hero;
