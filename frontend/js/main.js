let searchBtn = document.querySelector('#search-btn');
let searchForm = document.querySelector('.search-form');
// Array to store cart items
let cartItems = [];
// Get all "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll('[id^="product-"]');

// Add event listener to each button
addToCartButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default behavior of the anchor tag
    addToCart(event);
  });
});
function addToCart(event) {
  event.preventDefault();

  const productId = event.target.id;
  const productBox = document.getElementById(productId).closest('.box');
  const productName = productBox.querySelector('h3').textContent;
  const productPriceRange = productBox.querySelector('.price').textContent;
  const productImage = productBox.querySelector('img').src;
  const productPrice = productPriceRange.split(' - ')[0];

  // Check if the product already exists in the cartItems array
  const existingProductIndex = cartItems.findIndex(item => item.name === productName);

  if (existingProductIndex !== -1) {
    // If the product already exists, update the quantity
    cartItems[existingProductIndex].quantity++;
  } else {
    // If the product doesn't exist, create a new cart item object
    const cartItem = {
      name: productName,
      price: productPrice,
      image: productImage,
      quantity: 1
    };

    // Add the new cart item to the cartItems array
    cartItems.push(cartItem);
  }

  // Update the shopping cart display
  updateShoppingCart();
}
function updateShoppingCart() {
  const shoppingCart = document.querySelector('.shopping-cart');
  const cartItemsContainer = shoppingCart.querySelector('.box-container');
  const totalPriceElement = shoppingCart.querySelector('.total');

  // Clear the existing cart items
  cartItemsContainer.innerHTML = '';

  // Calculate the total price
  let totalPrice = 0;

  // Loop through the cart items and create HTML elements
  cartItems.forEach(item => {
    const cartItemElement = document.createElement('div');
    cartItemElement.classList.add('box');

    const itemHTML = `
      <i class="fas fa-trash delete-icon"></i>
      <img src="${item.image}" alt="${item.name}">
      <div class="content">
        <h3>${item.name}</h3>
        <span class="price">${item.price}</span>
        <span class="quantity">pcs: ${item.quantity}</span>
      </div>
    `;

    cartItemElement.innerHTML = itemHTML;
    cartItemsContainer.appendChild(cartItemElement);

    // Add event listener to the delete icon
    const deleteIcon = cartItemElement.querySelector('.delete-icon');
    deleteIcon.addEventListener('click', () => removeFromCart(cartItems.indexOf(item)));

    // Update the total price (considering the quantity)
    totalPrice += parseFloat(item.price.replace(/[^\d.-]/g, '')) * item.quantity;
  });

  // Update the total price display
  totalPriceElement.textContent = `Total: ₸${totalPrice.toFixed(2)}/-`;
}
function removeFromCart(itemIndex) {
  const itemToRemove = cartItems[itemIndex];

  // If the item has a quantity greater than 1, decrement the quantity
  if (itemToRemove.quantity > 1) {
    itemToRemove.quantity--;
  } else {
    // If the quantity is 1, remove the item from the cartItems array
    cartItems.splice(itemIndex, 1);
  }

  // Update the shopping cart display
  updateShoppingCart();

  // Recalculate the total price
  const shoppingCart = document.querySelector('.shopping-cart');
  const totalPriceElement = shoppingCart.querySelector('.total');
  let totalPrice = 0;

  // Loop through the remaining cart items and calculate the new total price
  cartItems.forEach(item => {
    totalPrice += parseFloat(item.price.replace(/[^\d.-]/g, '')) * item.quantity;
  });

  // Update the total price display
  totalPriceElement.textContent = `Total: ₸${totalPrice.toFixed(2)}/-`;
}
searchBtn.onclick = function () { 
    searchForm.classList.toggle('show-form');
    shoppingCart.classList.remove('show-cart');
    formLogin.classList.remove('show-log');
    document.querySelector('.navbar').classList.remove('active');  
    menuBtn.classList.remove('fa-times');

};

let cartBtn = document.querySelector('#cart-btn');
let shoppingCart = document.querySelector('.shopping-cart'); 

cartBtn.onclick = function () { 
    shoppingCart.classList.toggle('show-cart');
    searchForm.classList.remove('show-form');
    formLogin.classList.remove('show-log');
    document.querySelector('.navbar').classList.remove('active');  
    menuBtn.classList.remove('fa-times');
};

let loginBtn = document.querySelector('#login-btn'); 
let formLogin = document.querySelector('.login-form'); 

loginBtn.onclick = function () { 
    formLogin.classList.toggle('show-log');
    shoppingCart.classList.remove('show-cart');
    searchForm.classList.remove('show-form');
    document.querySelector('.navbar').classList.remove('active');  
    menuBtn.classList.remove('fa-times');

};

let menuBtn = document.querySelector('#menu-btn'); 

menuBtn.onclick = () => {
    menuBtn.classList.toggle('fa-times');
    document.querySelector('.navbar').classList.toggle('active');  
    formLogin.classList.remove('show-log');
    shoppingCart.classList.remove('show-cart');
    searchForm.classList.remove('show-form');

    
}

window.onscroll = () => {
    formLogin.classList.remove('show-log');
    shoppingCart.classList.remove('show-cart');
    searchForm.classList.remove('show-form');
    document.querySelector('.navbar').classList.remove('active'); 
    menuBtn.classList.remove('fa-times');
};

window.onload = () => {
    formLogin.classList.remove('show-log');
    shoppingCart.classList.remove('show-cart');
    searchForm.classList.remove('show-form');
    document.querySelector('.navbar').classList.remove('active'); 
    menuBtn.classList.remove('fa-times');
};

// Swiper js 
var swiper = new Swiper(".product-slider", {
    loop:true,
    slidesPerView: 1,
    spaceBetween: 10,
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1020: {
        slidesPerView: 3,
      },
    },
  });
// Swiper js 
var swiper = new Swiper(".review-slider", {
    loop:true,
    slidesPerView: 1,
    spaceBetween: 10,
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1020: {
        slidesPerView: 3,
      },
    },
  });