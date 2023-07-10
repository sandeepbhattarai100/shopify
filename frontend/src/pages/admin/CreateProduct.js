import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import AdminMenu from '../../components/AdminMenu';
import Layouts from '../../components/Layouts';
import Wrapper from '../../components/Wrapper';
import { useNavigate } from 'react-router-dom';


const CreateProduct = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState();

  const getAllCat = async () => {
    try {
      const { data } = await axios.get('/api/v1/category/get-all-cat');
      setCategories(data.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCat();
  }, []);

  const handleCreate = async (data) => {
    try {
      const productData = new FormData();
      productData.append('name', data.name);
      productData.append('description', data.description);
      productData.append('price', data.price);
      productData.append('quantity', data.quantity);
      productData.append('photo', data.photo[0]);
      productData.append('category', data.category);
      productData.append('shipping', data.shipping);
      // console.log(productData.entries())
      for (var pair of productData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }

      const responseData = await axios.post(
        '/api/v1/product/create-product',
        productData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (responseData.data.success) {
        window.alert('Success');
        navigate("/dashboard/admin/products");

      } else {
        window.alert('Failed');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layouts>
      <div className='flex justify-around'>
        <div className='flex-[0.2] h-full shadow-lg'>
          <AdminMenu />
        </div>
        <div className='flex-[0.8] px-3'>
          <Wrapper className='flex justify-center items-center flex-col'>
            <h1 className='text-orange-500 text-[32px] font-normal uppercase'>create product</h1>

            <div className='w-[700px] max-w-[800px] border my-5 flex flex-col'>
              <form onSubmit={handleSubmit(handleCreate)} className='flex flex-col'>
                <select
                  {...register('category')}
                  placeholder='select a category'
                  className='border-orange-300 bg-orange-50 outline-none w-full p-4 capitalize'
                >
                  {categories.map((c) => (
                    <option key={c._id} value={c._id} className='capitalize'>
                      {c.name}
                    </option>
                  ))}
                </select>
                <input
                  type='file'
                  className='p-4 w-full'
                  {...register('photo')}
                  accept='image/*'

                />

                <input
                  type='text'
                  {...register('name')}
                  placeholder='Enter Product name'
                  className='p-4 outline-none border-b-2 text-[18px]'
                />
                <input
                  type='text'
                  {...register('description')}
                  placeholder='Enter Product Description'
                  className='p-4 outline-none border-b-2 text-[18px]'
                />
                <input
                  type='number'
                  {...register('price')}
                  placeholder='Enter Product Price'
                  className='p-4 outline-none border-b-2 text-[18px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                />
                <input
                  type='number'
                  {...register('quantity')}
                  placeholder='Enter Product Quantity'
                  className='p-4 outline-none border-b-2 text-[18px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                />
                <select
                  {...register('shipping')}
                  placeholder='Shipping Value'
                  className='p-4 outline-none bg-orange-50 '
                >
                  <option className='text-[22px] text-gray-500'>
                    Select your option
                  </option>
                  <option value='0'>No</option>
                  <option value='1'>Yes</option>
                </select>
                <button
                  type='submit'
                  className='bg-orange-400 rounded-sm p-4 mt-4 text-white font-semibold text-[18px]'
                >
                  CREATE PRODUCT
                </button>
              </form>
            </div>
          </Wrapper>
        </div>
      </div>
    </Layouts>
  );
};

export default CreateProduct;