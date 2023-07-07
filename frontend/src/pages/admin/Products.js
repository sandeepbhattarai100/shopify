import React, { useEffect, useState } from 'react'
import Layouts from '../../components/Layouts'
import Wrapper from '../../components/Wrapper'
import AdminDashboard from './AdminDashboard'
import AdminMenu from '../../components/AdminMenu'
import axios from 'axios'
import Nike from '../../utils/nike.png';
import { Link } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Products = () => {
    const [products, setProducts] = useState();


    const getallProducts = async () => {
        try {
            const { data } = await axios.get('/api/v1/product/get-all-product');
            if (data.success) {
                setProducts(data.getAll);
                console.log(data.getAll._id);
            }
            else {
                window.alert('there is some problem fetching the data')
            }
        } catch (error) {
            console.log(error);
            window.alert('cannot retrieve products')

        }


    }
    useEffect(() => {
        getallProducts();
    }, []);

    const deleteProduct = async (id) => {
        try {
            const { data } = await axios.delete(`/api/v1/product/delete-product/${id}`)
            if (data.success) {
                getallProducts();

            }
            console.log(id);
        } catch (error) {
            console.log(error);
            window.alert("cannot delete product");

        }
    }
    return (
        <Layouts>
            <div className='flex justify-around'>
                <div className='flex-[0.2] h-full shadow-lg'>
                    <AdminMenu />
                </div>
                <div className='flex-[0.8] px-3 max-w-[800px] mx-auto'>
                    <div className='my-5'>
                        {
                            products && products.map((p) => (

                                <div className='border-b-2 px-1 py-3 flex gap-2 my-1 hover:bg-gray-50 ' key={p._id}>
                                    <Link to={`/dashboard/admin/product/${p.slug}`} >
                                        <div className='h-[80px] w-[100px] border-r-2 '>
                                            <img src={`/api/v1/product/get-product-photo/${p._id}`} alt='product img' className='h-[80px] overflow-hidden object-cover' />
                                        </div>
                                    </Link>
                                    <div className=' flex flex-col w-full'>
                                        <h3 className='text-[28px]'>{p.name}</h3>
                                        <div className=' flex justify-between w-full'>
                                            <span>
                                                <span className='text-gray-500 text-[16px]'>$ {p.price}</span>

                                            </span>
                                            <span className='flex gap-2'>
                                                <span className='active:scale-95 cursor-pointer'><EditIcon className='text-blue-500' /></span>
                                                <span className='active:scale-95 cursor-pointer' onClick={() => deleteProduct(p._id)}><DeleteIcon className='text-red-500' /></span>
                                            </span>
                                        </div>

                                    </div>
                                </div>

                            ))
                        }


                    </div>
                </div>

            </div>

        </Layouts >


    )
}

export default Products