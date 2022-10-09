import React, { useContext } from "react";
import { CartContext } from "./Cart";

const Items = ({ item_id, description, title, image, price, quantity }) => {
  const { removeItem, increment, decrement } = useContext(CartContext);

  return (
    <> 
      <div className="items-info">
        <div className="product-img">
          <img src={image} alt="iamge" />
        </div>

        <div className="title">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>

        <div className="add-minus-quantity">
          <i className="fas fa-minus minus" onClick={() => decrement(item_id)}></i>
          <input type="text" placeholder={quantity} disabled />
          <i className="fas fa-plus add" onClick={() => increment(item_id)}></i>
        </div>

        <div className="price">
          <h3>$ {price}</h3>
        </div>

        <div className="remove-item">
          <i
            className="fas fa-trash-alt remove"
            onClick={() => removeItem(item_id)}></i>
        </div>
      </div>

      <hr />
    </>
  );
};

export default Items;
