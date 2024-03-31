import CartItem from "./CartItem"
import Notification from "./Notification"
import { proceedToCheckout } from "../services/orderService";
const Cart = (props)=>{
    return(
        props.cartItems.length === 0 ? <h1>Cart is Empty</h1> :
        <div>
            <h1>Cart</h1>
            <button onClick={async () => { await props.ptc() }}>Proceed to Checkout</button>
            <div className="row">
                {props.cartItems.map((item) => (item.quantity>0?
                    <CartItem key={item.item_id} item={item} handleIncrement={props.cartIncrementHandler} handleDecrement={props.cartDecrementHandler}  handleCartDelete={props.cartDeleteHandler} />
                    : null
                ))}
            </div>
            
        </div>
    )
}
export default Cart