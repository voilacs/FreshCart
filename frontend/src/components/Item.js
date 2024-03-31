import React from 'react';

const ItemLoggedin = ({ item, addToCart }) => {
    const handleAddToCart = async (e) => {
        e.preventDefault();
        try {
            await addToCart(item.item_id);
        } catch (error) {
            console.error('Error occurred while adding item to cart:', error);
        }
    }

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
            <button onClick={handleAddToCart}>Add</button>
        </div>
    );
};

const ItemLoggedout = ({ item }) => {
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
        </div>
    );
}
export default { ItemLoggedin, ItemLoggedout};
