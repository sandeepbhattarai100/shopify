import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Wrapper from '../components/Wrapper';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Nike from '../utils/nike.png';
import axios from 'axios';
import Layouts from '../components/Layouts';
import Product from '../components/Product';
import Products from './admin/Products';

const SingleProduct = () => {
    const params = useParams();
    const [product, setProduct] = useState();
    const [relatedProduct, setRelatedProduct] = useState('');


    const getSingleProd = async () => {
        try {
            const values = params?.slug;
            const { data } = await axios.get(`/api/v1/product/get-single-product/${values}`)
            handleRelatedProduct(data?.product[0]._id, data?.product[0]?.category._id);
            // console.log(data?.product[0].category._id)


            setProduct(data?.product[0]);



        } catch (error) {
            console.log(error)

        }
    }
    useEffect(() => {
        if (params?.slug) getSingleProd();
    }, [params?.slug]);

    const handleRelatedProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`)
            setRelatedProduct(data?.product);
            console.log(relatedProduct);
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <Layouts>

            <Wrapper>
                <div className='flex flex-col  md:flex-row items-start'>
                    {/* left start */}
                    {/* <ProductDetailsCrousel images={p?.image?.data} thumbnail={p?.thumbnail?.data.attributes?.url} /> */}
                    <img src={`/api/v1/product/get-product-photo/${product?._id}`} alt='prod' className='w-[50%]' />

                    {/* left end */}

                    {/* right start */}

                    <div className=' w-full  md:pt-[80px] flex flex-col md:flex-1 ml-4'>
                        {/* top */}
                        <div className='mb-10'>
                            <div className='text-[28px]  capitalize font-semibold md:text-[34px]'>{product?.name}</div>
                            <div className='text-[18px] font-medium -mt-3'>{product?.subtitle}</div>
                            <div className=' text-[18px] font-semibold uppercase mt-5 tracking-wide '>mrp : ${product?.price}</div>
                            <div className=' text-sm text-gray-500 capitalize'>inc of all taxes <br />(also includes all applicable duties)</div>
                        </div>
                        {/* heading start */}
                        <div className='flex justify-between mb-5'>
                            <span className='text-lg font-semibold'>Select Size</span>
                            <span className='text-lg font-medium text-black/[0.5] cursor-pointer'>Select Guide</span>

                        </div>
                        {/* heading close */}

                        {/* size start */}


                        {/* add to cart button */}


                        <div className=' flex gap-6'>
                            <button className='py-3 bg-orange-600 text-white rounded-full font-medium text-[18px]  hover:opacity-80 active:scale-95 w-[50%] mx-auto ' onClick={() => {

                            }}>Add To Bag</button>

                            {/* wishlist button */}
                            <button className='py-3 border border-gray-500 text-black rounded-full font-medium text-[18px]  hover:border-black active:scale-95 w-[50%] mx-auto '>Favourite <span ><FavoriteBorderIcon className='text-[18px] font-extralight text-black/[0.6]
'/></span></button>
                        </div>

                        {/* button end */}

                        <div className='mt-3 text-black text-[15px] font-semibold'>{product?.description}</div>


                    </div>

                    {/* right end */}

                </div>
                <h1 className='my-10 text-[32px] font-semibold'>Related Products</h1>
                <div className='grid grid-cols-3 gap-5'>
                    {
                        // console.log(relatedProduct.name)
                        relatedProduct && relatedProduct?.map((p) => (
                            <Product p={p} />
                        ))

                    }
                    <h1>
                        {relatedProduct.length < 1 && (
                            <p className="text-center text-[22px]">No Related Products found</p>
                        )}
                    </h1>

                </div>
            </Wrapper >
        </Layouts>
    )
}

export default SingleProduct