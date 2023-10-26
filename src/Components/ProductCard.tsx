import { Product } from "@/types";
import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <Link href={`/products/${product._id}`} className="product-card">
            <div className="product-card_img-container">
                <Image
                    src={product.mainImage}
                    alt={product.title}
                    width={200}
                    height={200}
                    className="product-card_img"
                />
            </div>
            <div className="flex flex-col gap-3">
                <h3 className="product-title">{product.title}</h3>
                <div className="flex justify-between">
                    <p className="opacity-50 text-black text-lg capitalize">
                        {product.category}
                    </p>
                    <p className="text-lg text-black font-semibold">
                        <span>{product?.currency}</span>
                        <span>{product?.currentPrice}</span>
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
