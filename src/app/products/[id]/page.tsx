import { getProductById } from "@/src/lib/actions";
import { formatNumberWithCommas } from "@/src/lib/utils";
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

						<div className='flex flex-col gap-4'>
							<div className="flex gap-3">
								<div className='product-rating'>
									<Image
										src="/assets/icons/star.svg"
										alt="star"
										width={16}
										height={16}
									/>
									<p className='text-sm text-primary-pink font-semibold'>
										{product.rating}
									</p>
								</div>

								<div className='product-reviews'>
									<Image
										src="/assets/icons/comment.svg"
										alt="comment"
										width={16}
										height={16}
									/>
									<p className='text-sm text-secondary font-semibold'>
										{product.reviewsCount}{" "} Reviews
									</p>
								</div>
							</div>

							<p className='text-sm text-black opacity-50'>
								<span className='text-primary-green font-semibold'>
									93%
								</span> of buyers enjoyed this product!
							</p>
						</div>
                    </div>

					<div className='my-7 gap-5 flex flex-col'>
						<div className='flex flex-wrap gap-5'>
							
						</div>
					</div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
