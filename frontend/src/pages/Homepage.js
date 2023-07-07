import React, { useEffect, useState } from 'react'
import Layouts from '../components/Layouts'
import SideBar from '../components/SideBar'
import Wrapper from '../components/Wrapper';
import FilterListIcon from '@mui/icons-material/FilterList';
import axios from 'axios';
const Homepage = () => {
    const [sideMenu, setSideMenu] = useState(true);
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [checked, setChecked] = useState([]);
    const [range, setRange] = useState(0);
    // useEffect(() => {
    //     setSideMenu(true);
    // }, []);
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get('/api/v1/product/get-all-product');
            if (data.success) {
                setProducts(data.getAll);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const getAllCat = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/get-all-cat');
            console.log(data.category);
            setCategory(data.category);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (!checked.length || !range.length) getAllProducts();
        getAllCat();
    }, [checked.length, range.length]);
    useEffect(() => {
        if (checked.length || range.length) filterProd();
    }, [checked, range]);

    //handling filter
    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        }
        else {
            all = all.filter((c) => c !== id);
        }
        setChecked(all);
    };
    const filterProd = async () => {
        try {
            const { data } = await axios.post('/api/v1/product/filter-product', {
                checked,
                range
            });
            console.log(data.product);
            setProducts(data?.product);
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className=''>

            <Layouts>
                <div className='relative'>
                    {
                        sideMenu && (
                            <div className='bg-white/90 w-[300px] h-auto fixed -mt-2 z-10'>
                                <SideBar className=' ' setSideMenu={setSideMenu} category={category}
                                    handleFilter={handleFilter}
                                    checked={checked}
                                    setChecked={setChecked}
                                    range={range}
                                    setRange={setRange}

                                />
                            </div>
                        )
                    }
                    <Wrapper>
                        <div className='flex justify-between mb-6'>
                            <span className='text-[28px] '>Hot Products</span>
                            <span onClick={() => setSideMenu(true)} className=' flex gap-2 cursor-pointer bg-white shadow-lg p-2 text-gray-500 hover:bg-black hover:text-white duration-150 rounded-lg'>
                                <FilterListIcon />
                                <p className='text=[18px] font-semibold font-sans'>Filters</p>

                            </span>
                        </div>
                        <div className='grid grid-cols-4 gap-8'>
                            {
                                products?.map((p) => (
                                    <div className='hover:scale-105 cursor-pointer flex flex-col gap-2 shadow-md ' key={p._id}>
                                        <img src={`/api/v1/product/get-product-photo/${p._id}`} alt='product-img' className='h-[250px] w-full  object-scale-down ' />
                                        <h4 className='font-semibold text-[18px] capitalize text-black mx-1 '>{p.name}</h4>
                                        <div className='flex justify-between px-1'>
                                            <span className='flex items-center gap-2'><h4 className='text-[18px] font-semibold'>$ {p.price}</h4>
                                                <h3 className=' text-gray-500 line-through text-sm '>$. 225</h3>
                                            </span>
                                            <span className='text-green-500 text-md'>20% off</span>

                                        </div>
                                        <button className=' mb-2 py-4 border bg-orange-500  text-white font-semibold rounded-full mx-2  active:scale-95 '>Add to Cart</button>
                                    </div>
                                ))
                            }
                        </div>
                    </Wrapper>
                </div>
            </Layouts></div>
    )
}
export default Homepage