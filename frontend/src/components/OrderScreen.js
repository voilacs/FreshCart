import React from 'react';
import './table.css';

const OrderScreen = ({ cartItems, name, buyer_id, orderFunction }) => {
    // Calculate grand total
    const grandTotal = cartItems.reduce((acc, item) => {
        return acc + item.current_price * item.quantity;
    }, 0);
    const totalSavings = cartItems.reduce((acc, item) => {
        return acc + (item.mrp - item.current_price) * item.quantity;
    }
    , 0);
    return (
        <div>
            <h1>Order Summary</h1>
            <h4>Deliver to: {name}</h4>
            <table className='order-table'>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>MRP</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Savings</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item) => (
                        <tr key={item.item_id}>
                            <td>{item.item_name}</td>
                            <td>{item.mrp}</td>
                            <td>{item.current_price}</td>
                            <td>{item.quantity}</td>
                            <td>{item.current_price * item.quantity}</td>
                            <td>{(item.mrp - item.current_price) * item.quantity}</td> {/* Assuming item.mrp is the original price */}
                        </tr>
                    ))}
                </tbody>
            </table>
            <h3>Total Savings: {totalSavings}</h3>
            <h2>Grand Total: {grandTotal}</h2>
            <button onClick={async () => { await orderFunction() }}>Place Order</button>
        </div>
    );
}

export default OrderScreen;
