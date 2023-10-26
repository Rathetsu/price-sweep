import { getProductById, getSimilarProducts } from "@/src/lib/actions";
import { formatNumberWithCommas } from "@/src/lib/utils";
import Modal from "@/src/components/Modal";
import PriceInfoCard from "@/src/components/PriceInfoCard";
import ProductCard from "@/src/components/ProductCard";
import { Product } from "@/types";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";


type Props = {
    params: {
        id: string;
    };
};

const ProductDetails = async ({ params: { id } }: Props) => {
    const product: Product = await getProductById(id);
    if (!product) redirect("/");
	const similarProducts = await getSimilarProducts(id);
    return (
        <div className="product-container">
            <div className="flex gap-28 xl:flex-row flex-col">
                <div className="product-image">
                    <Image
                        src={product.mainImage}
                        alt={product.title}
                        width={300}
                        height={300}
                        className="mx-auto"
                    />
                </div>
                <div className="flex flex-col flex-1">
                    <div className="flex flex-wrap justify-between items-start gap-5 pb-6">
                        <div className="flex flex-col gap-3">
                            <p className="font-semibold text-[28px] text-secondary">
                                {product.title}
                            </p>

                            <Link
                                href={product.url}
                                target="_blank"
                                className="text-base text-black opacity-50"
                            >
                                Visit Product
                            </Link>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="product-hearts">
                                <Image
                                    src="/assets/icons/red-heart.svg"
                                    alt="heart"
                                    width={20}
                                    height={20}
                                    // className='opacity-60'
                                />
                                <p className="text-base font-semibold text-[#D46F77]">
                                    {product.reviewsCount}
                                </p>
                            </div>

                            <div className="p-2 bg-white-200 rounded-10">
                                <Image
                                    src="/assets/icons/bookmark.svg"
                                    alt="bookmark"
                                    width={20}
                                    height={20}
                                />
                            </div>

                            <div className="p-2 bg-white-200 rounded-10">
                                <Image
                                    src="/assets/icons/share.svg"
                                    alt="share"
                                    width={20}
                                    height={20}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="product-info">
                        <div className="flex flex-col gap-2">
                            <p className="text-[34px] text-secondary fond-bold">
                                {product.currency}{" "}
                                {formatNumberWithCommas(product.currentPrice)}
                            </p>

                            {product.originalPrice ? (
                                <p className="text-[21px] text-secondary fond-bold opacity-50 line-through">
                                    {product.currency}{" "}
                                    {formatNumberWithCommas(
                                        product.originalPrice
                                    )}
                                </p>
                            ) : null}
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="flex gap-3">
                                <div className="product-rating">
                                    <Image
                                        src="/assets/icons/star.svg"
                                        alt="star"
                                        width={16}
                                        height={16}
                                    />
                                    <p className="text-sm text-primary-pink font-semibold">
                                        {product.rating}
                                    </p>
                                </div>

                                <div className="product-reviews">
                                    <Image
                                        src="/assets/icons/comment.svg"
                                        alt="comment"
                                        width={16}
                                        height={16}
                                    />
                                    <p className="text-sm text-secondary font-semibold">
                                        {product.reviewsCount} Reviews
                                    </p>
                                </div>
                            </div>

                            <p className="text-sm text-black opacity-50">
                                <span className="text-primary-green font-semibold">
                                    93%
                                </span>{" "}
                                of buyers enjoyed this product!
                            </p>
                        </div>
                    </div>

                    <div className="my-7 gap-5 flex flex-col">
                        <div className="flex flex-wrap gap-5">
                            <PriceInfoCard
                                title="Current Price"
                                iconSrc="/assets/icons/price-tag.svg"
                                value={`${
                                    product.currency
                                } ${formatNumberWithCommas(
                                    product.currentPrice
                                )}`}
                                borderColor="#B6BBFF"
                            />
                            <PriceInfoCard
                                title="Averag Price"
                                iconSrc="/assets/icons/chart.svg"
                                value={`${
                                    product.currency
                                } ${formatNumberWithCommas(
                                    product.averagePrice
                                )}`}
                                borderColor="#FFC300"
                            />{" "}
                            <PriceInfoCard
                                title="Highest Price"
                                iconSrc="/assets/icons/arrow-up.svg"
                                value={`${
                                    product.currency
                                } ${formatNumberWithCommas(
                                    product.highestPrice
                                )}`}
                                borderColor="#FF5733"
                            />{" "}
                            <PriceInfoCard
                                title="Lowest Price"
                                iconSrc="/assets/icons/arrow-down.svg"
                                value={`${
                                    product.currency
                                } ${formatNumberWithCommas(
                                    product.lowestPrice
                                )}`}
                                borderColor="#BEFFC5"
                            />
                        </div>
                    </div>
                    {/* <Modal productId={id} /> */}
                </div>
            </div>

            <div className="flex flex-col gap-16">
                <div className="flex flex-col gap-5">
                    <h3 className="text-2xl text-secondary font-semibold">
                        Product Description
                    </h3>

                    <div className="flex flex-col gap-4">
                        {product?.description?.split("\n")}
                    </div>
                </div>

                <button className="btn w-fit mx-auto flex items-center justify-center gap-3 min-w-[200px]">
                    <Image
                        src="/assets/icons/bag.svg"
                        alt="check"
                        width={22}
                        height={22}
                    />

                    <Link href="/" className="text-base text-white">
                        Buy Now
                    </Link>
                </button>
            </div>

            {similarProducts && similarProducts?.length > 0 && (
                <div className="py-14 flex flex-col gap-2 w-full">
                    <p className="section-text">Similar Products</p>

                    <div className="flex flex-wrap gap-10 mt-7 w-full">
                        {similarProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;
