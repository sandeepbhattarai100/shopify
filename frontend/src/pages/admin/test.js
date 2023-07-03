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

                            <select placeholder='select a category' className='border-orange-300 bg-orange-50 outline-none w-full p-4 capitalize'
                                onChange={(value) => { setCategory(value) }}

                            >
                                {categories.map((c) => (

                                    <option key={c._id} value={c._id} className='capitalize '>{c.name}</option>
                                ))}
                            </select>
                            <input type='file' className='p-4 w-full ' name='photo' onChange={(e) => setPhoto(e.target.files[0])} accept='image/*' />
                            {photo && (
                                <div className='text-center'><img src={URL.createObjectURL(photo)} className='h-[300px] w-[300px]' alt='product photo' /></div>
                            )}
                            <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Product name' className='p-4 outline-none border-b-2 text-[18px]' />
                            <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Enter Product Description' className='p-4 outline-none border-b-2 text-[18px]' />
                            <input type='number' value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Enter Product Price' className='p-4 outline-none border-b-2 text-[18px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' />
                            <input type='number' value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder='Enter Product Quantity' className='p-4 outline-none border-b-2 text-[18px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' />
                            <select placeholder='Shipping Value' onChange={(value) => setShipping(value)} className='p-4 outline-none bg-orange-50 '>
                                <option value="" className='text-[22px] text-gray-500'>Select your option</option>
                                <option value='1'>Yes</option>
                                <option value='2'>No</option>
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