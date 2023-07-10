import { joinPaths } from '@remix-run/router';
import { useContext, useEffect, useState, createContext } from 'react';
import { json } from 'react-router-dom';


const CartContext = createContext();

const CartProvider = ({ children }) => {

    const [cartItem, setCartItem] = useState([]);

    useEffect(() => {
        const localCartItem = localStorage.getItem('cart');
        if (localCartItem) setCartItem(JSON.parse(localCartItem));
    }, []);



    const handleRemoveFromCart = (pid) => {

        let item = [...cartItem];
        item = item.filter(p => p._id !== pid);
        setCartItem(item);
        localStorage.setItem('cart', JSON.stringify(item));

    };




    return (
        <CartContext.Provider value={[
            cartItem,
            setCartItem,
            handleRemoveFromCart
            // handleAddToCart,

        ]}>
            {children}
        </CartContext.Provider>
    )
}
//custom hook for cart context

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };
