import { getForYou } from "../services/ForYouService";
import { useEffect, useState } from "react";
import Item from "./Item";

const ForYou = ({ buyer_id ,addToCart}) => {
    const [items, setItems] = useState({});
    
    useEffect(() => {
        getForYou({ buyer_id })
            .then((data) => {
                setItems(data);
            })
            .catch((error) => {
                console.error("Error occurred while fetching for you items:", error);
            });
    }, [buyer_id]);
    if (Object.keys(items).length === 0) {
        return null; // Render nothing until items are fetched
    }
    return (
        <div>
            <h1>For You</h1>
            <div className="items">
                {Object.keys(items).map((category) => (
                    <div key={category}>
                        <h2>{category}</h2>
                        {items[category].map((item) => (
                            <Item.ItemLoggedin key={item.item_id} item={item} addToCart={addToCart} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ForYou;
