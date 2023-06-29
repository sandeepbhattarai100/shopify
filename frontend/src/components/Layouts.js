import React from 'react'
import Header from './layout/Header'
import Footer from './layout/Footer'

const Layouts = ({ children }) => {
    return (
        <>
            <Header />
            <main className='h-auto' >
                <div>{children}</div>
            </main >

            <Footer />
        </>

    )
}

export default Layouts