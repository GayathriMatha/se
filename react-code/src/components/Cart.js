import React, { createContext, useReducer, useEffect } from "react";
import "./cart.css";

import ContextCart from "./ContextCart";
import { reducer } from "./reducer";

export const CartContext = createContext();


 

const initialState = {
  item: [],
  totalAmount: 0,
  totalItem: 0,
  address: ""
};

 


const Cart = () => { 
  // const [item, setItem] = useState(products);
  const [state, dispatch] = useReducer(reducer, initialState,  );
 
  
  useEffect(() => { 
    fetch("http://localhost:3000/api/getItemList")
      .then((res) => res.json())
      .then((api_items) => { 
            dispatch({
              type: "SET_API_ITEMS",
              payload: api_items,
            });   
      })
  }, [state.items]);
 


  
  // to delete the indv. elements from an Item Cart
  const removeItem = (id) => {
    return dispatch({
      type: "REMOVE_ITEM",
      payload: id,
    });
  };

  // clear the cart
  const clearCart = () => {
    return dispatch({ type: "CLEAR_CART" });
  };
 

  // clear the cart
  const submitCart = () => {
    return dispatch({ type: "SUBMIT_CART" });
  };

  // increment the item
  const changeAddressValue = (val) => {
    return dispatch({
      type: "CHANGE_ADDRESS_VALUE",
      payload: val,
    });
  };



  // increment the item
  const increment = (id) => {
    return dispatch({
      type: "INCREMENT",
      payload: id,
    });
  };

  // decrement the item
  const decrement = (id) => {
    
    return dispatch({
      type: "DECREMENT",
      payload: id,
    });
  };

  // we will use the useEffect to update the data
  useEffect(() => {
    // console.log(state.item);
    dispatch({ type: "GET_TOTAL" }); 
  }, [state.item]);



  return (
    <CartContext.Provider
      value={{ ...state, removeItem, changeAddressValue, clearCart,submitCart, increment, decrement }}>
      <ContextCart />
    </CartContext.Provider>
  );
};

export default Cart;
