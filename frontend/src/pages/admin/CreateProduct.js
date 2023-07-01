import React, { useEffect, useState } from 'react'
import Layouts from '../../components/Layouts'
import AdminMenu from '../../components/AdminMenu'
import Wrapper from '../../components/Wrapper'
import axios from 'axios'

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  // const [category, setCategory] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [quantity, setQuantity] = useState();
  const [photo, setPhoto] = useState();
  const getAllCat = async () => {

    const { data } = await axios.get('/api/v1/category/get-all-cat');
    setCategories(data.category);
  };
  useEffect(() => {
    getAllCat();
  }, []);
  // console.log(categories);
  return (
    <Layouts>
      <div className='h-[80vh]  flex justify-around'>
        <div className='flex-[0.2] h-full shadow-lg'>
          <AdminMenu />

        </div>
        <div className='flex-[0.8] px-3'>
          <Wrapper className='flex justify-center items-center flex-col'>
            <h1 className='text-orange-500 text-[32px] font-normal uppercase'>create product</h1>
            <div className=' w-[700px] max-w-[800px] border my-5'>
              <select placeholder='select a category' className='border-orange-300 bg-orange-50 outline-none w-full p-4 capitalize'
                onChange={(value) => { setCategory(value) }}
              >
                {categories.map((c) => (
                  <option key={c._id} value={c._id} className='capitalize'>{c.name}</option>
                ))}
              </select>
              <input type='file' className='p-4 w-full ' name='photo'/>
            </div>
          </Wrapper>
        </div>
      </div>

    </Layouts>
  )
}

export default CreateProduct