import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link , Navigate} from 'react-router-dom';
import loginService from './services/loginService';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import itemService from './services/itemService';
import cartItemService from './services/cartItemService';
import Home from './components/Home';
import Cart from './components/Cart';
import { proceedToCheckout,orderFromCart } from "./services/orderService";
import OrderScreen from './components/OrderScreen';
import { getWarehouseData } from './services/warehouseService';
import Warehouses from './components/Warehouses';
import BuyerData from './components/BuyerData';
import ForYou from './components/ForYou';
function App() {
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [items, setItems] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);
  const [cartItems, setCartItems] = useState([])
  const [warehouses, setWarehouses] = useState([]);
  const handleLogin = async ({ username, password }) => {
    try {
      const response = await loginService.loginBuyer({ email: username, password });
      window.localStorage.setItem('loggedInUser', JSON.stringify(response));
      setLoggedInUserId(response.buyer_id);
      setLoggedInUser(response.buyer_name);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      window.location.href = "/";
    } catch (error) {
      setErrorMessage('Invalid username or password');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  const cartIncrementHandler = async ({ item_id }) => {
    try {
        await cartItemService.incrementItem({ buyer_id: loggedInUserId, item_id });

        const updatedCartItems = cartItems.map(item => {
            if (item.item_id === item_id) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        setCartItems(updatedCartItems);
    } catch (error) {
        setErrorMessage('Error incrementing item');
        setTimeout(() => {
            setErrorMessage(null);
        }, 5000);
    }
};
const ptcFunction = async() => {
  const response = await proceedToCheckout({ buyer_id: loggedInUserId });
  if (response.message === 'Order Verified') {
      console.log('Order Verified');
      window.location.href = '/order';
  } else {
      setErrorMessage(response.message);
      setTimeout(() => {
          setErrorMessage(null);
      }, 2000);
  }
}
const cartDecrementHandler = async ({ item_id }) => {
    try {
        await cartItemService.decrementItem({ buyer_id: loggedInUserId, item_id });

        const updatedCartItems = cartItems.map(item => {
            if (item.item_id === item_id) {
                const newQuantity = item.quantity - 1;
                if (newQuantity <= 0) {
                    return null;
                } else {
                    return { ...item, quantity: newQuantity };
                }
            }
            else{
              return item;
            }
        }).filter(Boolean); 
        setCartItems(updatedCartItems);
    } catch (error) {
        setErrorMessage('Error decrementing item');
        setTimeout(() => {
            setErrorMessage(null);
        }, 5000);
    }
};

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser');
    setLoggedInUserId(null);
    setLoggedInUser(null);
    console.log('called')
  };
const handleCartDelete = async ({ item_id }) => {
  try {
      await cartItemService.removeItem({ buyer_id: loggedInUserId, item_id });

      const updatedCartItems = cartItems.filter(item => item.item_id !== item_id);
      setCartItems(updatedCartItems);
  } catch (error) {
      setErrorMessage('Error removing item from cart');
      setTimeout(() => {
          setErrorMessage(null);
      }, 5000);
  }
}
  useEffect(() => {
    const fetchData = async () => {
      const loggedInUser = window.localStorage.getItem('loggedInUser');
      if (loggedInUser) {
        const parsedUser = JSON.parse(loggedInUser);
        console.log(parsedUser)
        setLoggedInUserId(parsedUser.buyer_id);
        setLoggedInUser(parsedUser.buyer_name);
        const fetchedCartitems = await cartItemService.getAll({buyer_id:parsedUser.buyer_id})
        setCartItems(fetchedCartitems);
      }
      const fetchWarehouseData = await getWarehouseData();
      setWarehouses(fetchWarehouseData);
      const fetchedItems = await itemService.getAll();
      setItems(fetchedItems);
    };
    fetchData();
  }, []);

  const addToCartHandler = async (item_id) => {
    try {
        const existingItem = cartItems.find(item => item.item_id === item_id);

        if (existingItem) {
            await cartItemService.incrementItem({ item_id, buyer_id: loggedInUserId });
            const updatedCartItems = cartItems.map(item => {
                if (item.item_id === item_id) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
            setCartItems(updatedCartItems);
        } else {
            await cartItemService.addItem({ item_id, buyer_id: loggedInUserId });
            const item = items.find(item => item.item_id === item_id);
            setMessage('Item added to cart');
            const newItem = { item_id, quantity: 1,item_name: item.item_name,current_price: item.current_price, mrp: item.mrp}; 
            setCartItems(cartItems.concat(newItem));
        }

        setTimeout(() => {
            setMessage(null);
        }, 5000);
    } catch (error) {
        setErrorMessage('Error adding item to cart');
        setTimeout(() => {
            setErrorMessage(null);
        }, 5000);
    }
}
  const orderFunction = async () => {
    try{
      const response = await orderFromCart({buyer_id:loggedInUserId});
      console.log(response)
      setMessage('Order Placed Successfully');
      setTimeout(() => {
        setMessage(null);
        window.location.href = '/';
      }, 5000);
    }
    catch(error){
      console.log(error)
    }
  }

  
  return (
    <Router>
      <div>
        <Navbar loggedInUser={loggedInUser} handleLogout={handleLogout} />
        <Notification.NotificationGreen message={message} />
        <Notification.NotificationRed message={errorMessage} />
        <Routes>
          <Route path="/login" element={ loggedInUserId ? <Navigate to='/'/> : <LoginForm handleLogin={handleLogin} />} />
          <Route path="/" element={<Home loggedInUserId={loggedInUserId} addToCartHandler={addToCartHandler} items={items} />} />
          <Route path='/cart' element= {!loggedInUserId ? <Navigate to='/'/> : <Cart ptc={ptcFunction}cartItems={cartItems} buyer_id={loggedInUserId} cartIncrementHandler={cartIncrementHandler} cartDecrementHandler={cartDecrementHandler} cartDeleteHandler={handleCartDelete} />} />
          <Route path = '/order' element = { <OrderScreen buyer_id={loggedInUserId} cartItems = {cartItems} name = {loggedInUser}orderFunction= {orderFunction}/>} />
          <Route path='/warehouses' element={<Warehouses  />} />
          <Route path = '/buyerData' element={<BuyerData />} />
          <Route path = '/foryou' element={<ForYou buyer_id={loggedInUserId} addToCart={addToCartHandler}  />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
