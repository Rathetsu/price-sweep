import React from "react";
import Link from "next/link";
import Image from "next/image";

const navIcons = [
	{src: '/assets/icons/search.svg', alt: 'search'},
	{src: '/assets/icons/black-heart.svg', alt: 'heart'},
	{src: '/assets/icons/user.svg', alt: 'user'},
]

const Navbar = () => {
  return (
    <header className="w-full">
      <nav className='nav'>
		<Link href="/" className='flex items-center gap-1'>
			<Image
				src='/assets/logo/png/logo-no-background.png'
				width={200}
				height={25}
				alt='logo'
			/>
		</Link>

		<div className='flex items-center gap-5'>
			{navIcons.map((icon, idx) => (
				<Image
					key={idx}
					src={icon.src}
					width={28}
					height={28}
					alt={icon.alt}
					className='object-contain'
				/>
			))}
		</div>
	  </nav>
    </header>
  );
};

export default Navbar;
