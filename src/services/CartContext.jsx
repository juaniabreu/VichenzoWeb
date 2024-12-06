import axios from "axios";
import { createContext,useState,useEffect } from "react";

export const CartContext  = createContext()

export const CartProvider = ({children}) => {
    const [cart,setCart] = useState([])
    

    useEffect(()=>{

    },[])
    return (
        <CartContext.Provider value={{cart,setCart}}>
            {children}
        </CartContext.Provider>
    )

}
