import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import loginService from './services/loginService';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import itemService from './services/itemService';
import Item from './components/Item';

function App() {
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [items, setItems] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);

  const handleLogin = async ({ username, password }) => {
    try {
      const response = await loginService.loginBuyer({ email: username, password });
      window.localStorage.setItem('loggedInUser', JSON.stringify(response));
      setLoggedInUserId(response.buyer_id);
      setLoggedInUser(response.buyer_name);
      setMessage(`Login successful, welcome ${response.buyer_name}!`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (error) {
      setErrorMessage('Invalid username or password');
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

  useEffect(() => {
    const fetchData = async () => {
      const loggedInUser = window.localStorage.getItem('loggedInUser');
      if (loggedInUser) {
        const parsedUser = JSON.parse(loggedInUser);
        setLoggedInUserId(parsedUser.buyer_id);
        setLoggedInUser(parsedUser.buyer_name);
      }
      const fetchedItems = await itemService.getAll();
      setItems(fetchedItems);
    };

    fetchData();
  }, []);
  const Home = ({loggedInUserId})=>{
      const addToCartHandler = async (item_id) => {
        try {
          await itemService.addToCart({ item_id, buyer_id: loggedInUserId });
          setMessage('Item added to cart');
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
      if (loggedInUserId){
        return (
          <div>
            <h2>Items</h2>
            <div className="row">
              {items.map((item) => (
                <Item.ItemLoggedin key={item.item_id} item={item} addToCart={addToCartHandler} />
              ))}
            </div>
          </div>
        )
      }
      return (
        <div>
          <h2>Items</h2>
          <br/>
          <div className="row">
            {items.map((item) => (
              <Item.ItemLoggedout key={item.item_id} item={item} />
            ))}
          </div>
        </div>
      )
    
  }
  return (
    <Router>
      <div>
        <Navbar loggedInUser={loggedInUser} handleLogout={handleLogout} />
        <Notification.NotificationGreen message={message} />
        <Notification.NotificationRed message={errorMessage} />
        <Routes>
          <Route path="/login" element={<LoginForm handleLogin={handleLogin} />} />
          <Route path="/" element={<Home loggedInUserId={loggedInUserId} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
