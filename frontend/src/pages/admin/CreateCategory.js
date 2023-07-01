import React, { useEffect, useState } from 'react'
import Layouts from '../../components/Layouts'
import AdminMenu from '../../components/AdminMenu'
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import CategoryForm from '../../components/CategoryForm';
import BorderColorSharpIcon from '@mui/icons-material/BorderColorSharp';
// import { Button, Modal } from 'antd';


const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState();
  const [visible, setVisible] = useState(false);
  const [updateName, setUpdateName] = useState();
  const [selected, setSelected] = useState(null);

  const getAllCat = async () => {
    try {
      const { data } = await axios.get('/api/v1/category/get-all-cat');
      setCategories(data.category);
    } catch (error) {
      console.log(error.message);
      window.alert(error.message);

    }
  }
  useEffect(() => {
    getAllCat();
  }, []);
  // console.log(categories);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name) {
        window.alert('Input is empty')
      }
      const { data } = await axios.post('/api/v1/category/create-category', {
        name
      });
      if (data?.success) {
        window.alert(`${name} is created`);
        getAllCat();
      }
      else {
        window.alert("cannot create category");
      }

    } catch (error) {
      console.log(error.message);
      window.alert("something went wrong in input form")

    }

  };

  //delete cat
  const deleteCat = async (id) => {
    try {
      const { data } = await axios.delete(`/api/v1/category/delete-cat/${id}`);
      if (data?.success) {
        setVisible(false);
        window.alert('deleted successfully');
        getAllCat();
      }
      else {
        window.alert("cannot delete the category")
      }
    } catch (error) {
      console.log(error.message);
      window.alert(error);

    }


  };
  //handle update
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(`/api/v1/category/update-category/${selected}`, {
        name: updateName
      });
      if (data?.success) {
        setSelected(null);
        setUpdateName('');
        setVisible(false);
        getAllCat();

        window.alert('Category updated');
      }

    } catch (error) {
      console.log(error.message);
      window.alert(error);

    }
  };
  console.log(selected);
  return (
    <Layouts>
      <div className='h-auto  flex justify-around'>
        <div className='flex-[0.2] h-full shadow-lg'>
          <AdminMenu />

        </div>
        <div className='flex-[0.8] px-3'>
          <div className='max-w-[800px] mx-auto'>
            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
          </div>
          <table className='w-[820px] mx-auto  my-5'>
            <thead className='w-[800px] '>
              <tr className='flex justify-between border-b-2 text-[28px] font-thin text-orange-500'>
                <th >TITLE</th>
                <th>ACTIONS</th>
              </tr>

            </thead>
            <tbody className='  [&>*:nth-child(even)]:bg-gray-50'>
              {
                categories.map((c) => (
                  <tr className='flex justify-between p-4  hover:bg-gray-100 ' key={c._id}><td className='w-full capitalize flex  justify-between'>{c.name}
                    <div className='flex  gap-10'>
                      <button className='cursor-pointer' onClick={() => { setVisible(true); setUpdateName(c.name); setSelected(c._id) }}><BorderColorSharpIcon className='text-blue-600 hover:text-blue-700 hover:scale-105 ' /></button>
                      <button className='cursor-pointer' onClick={() => deleteCat(c._id)}><DeleteIcon className='text-red-400 hover:text-red-600 hover:scale-105 ' /></button>

                    </div></td>
                  </tr>

                ))
              }

            </tbody>
          </table>

        </div>

      </div>
      {visible && (
        <div className='w-[100vw] h-[100vh] absolute top-0 left-0 bg-white/[0.6]'>
          <div className='flex justify-center items-center h-[100vh]'>   <div className=' w-[350px] max-w-[350px] bg-white h-[200px] border flex justify-center items-center shadow-sm' onClick={() => setVisible(false)}>
            <CategoryForm value={updateName} setValue={setUpdateName} handleSubmit={handleUpdate} />
          </div> </div>
        </div>
      )}
    </Layouts>
  )
}

export default CreateCategory