import React from 'react';

const CartItem = ({ item, handleIncrement, handleDecrement, handleCartDelete }) => {
  const calculateDiscount = () => {
    const mrp = item.mrp;
    const discountedPrice = item.current_price;
    const discountPercentage = ((mrp - discountedPrice) / mrp) * 100;
    return Math.round(discountPercentage);
  };

  return (
    <div>
      <h3>{item.item_name}</h3>
      {item.current_price < item.mrp ? (
        <div>
          <p>
            Price: <span style={{ textDecoration: 'line-through', fontSize: '0.9em' }}>₹ {item.mrp}</span>
            <br />
            Discount: {calculateDiscount()}% Off
            <br />
            Discounted Price: <span style={{ fontSize: '0.8em' }}>₹ {item.current_price}</span>
          </p>
        </div>
      ) : (
        <p>Price: ₹ {item.current_price}</p>
      )}
      <div>
      <span>Quantity : {item.quantity} </span>
        <button onClick={async() => {await handleDecrement({item_id:item.item_id})}}> - </button>
        <span> </span>
        <button onClick={async() => {await handleIncrement({item_id:item.item_id}); }}> + </button>
        {/* <span> </span> */}
        {/* <button onClick={async() => {await handleCartDelete({item_id:item.item_id})}}> Delete </button> */}
      </div>
    </div>
  );
};

export default CartItem;
