import React, { useEffect, useState } from 'react'
import Layouts from '../../components/Layouts'
import AdminMenu from '../../components/AdminMenu'
import Wrapper from '../../components/Wrapper'
import axios from 'axios'

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  const getAllCat = async () => {


    const { data } = await axios.get('/api/v1/category/get-all-cat',
      FormData
    );
    setCategories(data.category);
  };
  useEffect(() => {
    getAllCat();
  }, []);


  const handleCreate = async (e) => {


    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      const { data } = await axios.post(
        "/api/v1/product/create-product",
        productData

      );
      if (data?.success) {
        window.alert("success")
      } else {
        window.alert("false")
        // navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);

    }
  };
  console.log(category);
  return (
    <Layouts>
      <div className='  flex justify-around'>
        <div className='flex-[0.2] h-full shadow-lg'>
          <AdminMenu />

        </div>
        <div className='flex-[0.8] px-3'>
          <Wrapper className='flex justify-center items-center flex-col'>
            <h1 className='text-orange-500 text-[32px] font-normal uppercase'>create product</h1>

            <div className=' w-[700px] max-w-[800px] border my-5 flex flex-col'>

              <select onChange={(value) => { setCategory(value) }} className='border-orange-300 bg-orange-50 outline-none w-full p-4 capitalize'


              >
                {categories.map((c) => (

                  <option key={c._id} value={c._id} className='capitalize '>{c.name}</option>
                ))}
              </select>
              <button onClick={handleCreate} className='bg-orange-400 rounded-sm p-4 mt-4 text-white font-semibold text-[18px]' >CREATE PRODUCT</button>
            </div>



          </Wrapper>
        </div>
      </div>

    </Layouts>
  )
}

export default CreateProduct