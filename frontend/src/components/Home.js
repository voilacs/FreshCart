import Item from './Item';

const Home = ({loggedInUserId,addToCartHandler,items})=>{
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

export default Home