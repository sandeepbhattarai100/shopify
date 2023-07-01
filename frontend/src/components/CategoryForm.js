import React from 'react'

const CategoryForm = ({ handleSubmit, value, setValue }) => {

    return (
        <div>
            <form onSubmit={handleSubmit} className='my-5 flex gap-3' >
                <input type='text' value={value} onChange={(e) => setValue(e.target.value)} placeholder='Add new category' className='border py-2 w-full outline-none text-[20px] text-gray-500 rounded-md' ></input>
                <button type='submit' className='bg-orange-500 px-5 py-3 text-white border-r rounded-md'>Add</button>
            </form>
        </div>
    )
}

export default CategoryForm