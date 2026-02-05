import axios from 'axios';
import React, {createContext, useCallback, useContext, useEffect, useReducer} from 'react'


const CartContext = createContext();
//reducer handling cart action -> add,remove, update qantity and item
const cartReducer = (state,action) =>{
    switch (action.type){
        case 'HYDRATE_CART': {
            return action.payload;
        }
        case 'ADD_ITEM':{
            const {_id, item, quantity} = action.payload;
            const exists =state.find(ci => ci._id === _id);
            if(exists){
                return state.map(ci=> ci._id === _id ? {...ci, quantity: ci.quantity + quantity} : ci)
            }
            return [...state, {_id, item, quantity}];
        }
        case 'REMOVE_ITEM': {
            return state.filter(ci => ci._id !== action.payload);
        }
        case 'UPDATE_ITEM': {
            const {_id, quantity} = action.payload;
            return state.map(ci => ci._id === _id ? {...ci, quantity}:ci)
        }
        case 'CLEAR_CART': {
            return [];
        }
        default : return state;
    }
}
//Initiate cart from localstorage
const initializer = () =>{
   try{
    return JSON.parse(localStorage.getItem('cart') || '[]');
   } 
   catch{
    return [];
}
}
export const CartProvider = ({children}) =>{
    const [cartItems,dispatch] = useReducer(cartReducer,[],initializer);
    //Presist cart state to localstorage
    useEffect(()=>{
        localStorage.setItem('cart', JSON.stringify(cartItems));
    },[cartItems]);
    //HYDRATE CART FROM SERVER 
    useEffect(()=>{
        const token = localStorage.getItem('authToken');
        if (token) {
            axios.get('http://localhost:4000/api/cart',{
                withCredentials:true,
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                const cartData = Array.isArray(res.data) ? res.data : (res.data.cartItems || res.data.items || []);
                dispatch({type:'HYDRATE_CART', payload: cartData});
            })
            .catch(err => { 
                // Silently fail on 401/403 (unauthorized), log other errors
                if (err.response?.status && ![401, 403].includes(err.response.status)) {
                    console.error('Cart hydration error:', err);
                }
            })
        }
    },[])

   
    //Dispatcher wrapper with useCallback for performance
    const addToCart = useCallback(async(item,quantity) =>{
        const token = localStorage.getItem('authToken');
        const res = await axios.post('http://localhost:4000/api/cart',{
            itemId: item._id,
            quantity: quantity},{
            withCredentials:true,
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        dispatch({type:'ADD_ITEM', payload:res.data});
    },[])
    const removeFromCart = useCallback(async _id =>{
        const token = localStorage.getItem('authToken');
        await axios.delete(`http://localhost:4000/api/cart/${_id}`,{
            withCredentials:true,
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        dispatch({type:'REMOVE_ITEM',payload:_id})
    },[])

    const updateQuantity = useCallback(async (_id, qantity) =>{
        const token = localStorage.getItem('authToken');
        const res = await axios.put(`http://localhost:4000/api/cart/${_id}`,{
            quantity:qantity},{
            withCredentials:true,
            headers:{
                Authorization: `Bearer ${token}` 
            }
        });
        dispatch({type:'UPDATE_ITEM',payload:res.data})
    },[])
    const clearCart = useCallback(async () => {
        const token = localStorage.getItem('authToken');
        await axios.post('http://localhost:4000/api/cart/clear', {}, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        dispatch({type:'CLEAR_CART'});
    },[]);

    const totalItems = Array.isArray(cartItems) ? cartItems.reduce((sum,ci) => sum + ci.quantity,0) : 0;
    const totalAmount = Array.isArray(cartItems) ? cartItems.reduce((sum,ci) => {
        const price = ci?.item?.price ?? 0;
        const quantity = ci?.quantity ?? 0;
        return sum + price * quantity;

    }, 0) : 0;
    return(
        <CartContext.Provider value={{
           cartItems,
           addToCart,
           removeFromCart,
           updateQuantity,
           clearCart,
           totalItems,
           totalAmount
        }}>
            {children}
            </CartContext.Provider>
    )
}
export const useCart = () => useContext(CartContext);
