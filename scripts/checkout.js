import {cart, removeCartItem, updateProductQuantity} from '../data/cart.js';
import { products } from '../data/products.js';

let cartHTML = ``;

cart.forEach((item) => {
    
    const productId = item.productId;
    let matchingItem;

    products.forEach((product) => {
        if(productId === product.id){
            matchingItem = product;
        }
    })

    cartHTML += ` 
    <div class="cart-item-container  js-cart-item-container-${matchingItem.id}" data-product-id=${matchingItem.id}>
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingItem.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingItem.name}
                </div>
                <div class="product-price">
                  ₹${matchingItem.price}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label  js-quantity-label">${item.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-quantity" data-product-id = ${matchingItem.id}>
                    Update
                  </span>

                  <input class="quantity-input js-quantity-input-${matchingItem.id}">
                  <span class="save-quantity-link  link-primary  js-save-quantity" data-product-id = ${matchingItem.id}> Save </span>

                  <span class="delete-quantity-link link-primary js-delete-product" data-product-id = ${matchingItem.id}>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      ₹50 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      ₹80 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    `;

});

updateCartQuantity();
document.querySelector(".js-order-summary").innerHTML = cartHTML;

document.querySelectorAll('.js-delete-product').forEach((productDelete) => {
    productDelete.addEventListener('click',function() {
      let id = productDelete.dataset.productId;
        
      removeCartItem(id);

      let container = document.querySelector(`.js-cart-item-container-${id}`);
      container.remove();

      updateCartQuantity();
    })
});

function updateCartQuantity(){
    let cartQuantity =0;
    
    cart.forEach(item => {
      cartQuantity += item.quantity;
    })

    document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} items`;
}

document.querySelectorAll('.js-update-quantity').forEach(updateQuantity => {
  updateQuantity.addEventListener('click', function() {
    let id = updateQuantity.dataset.productId;
    let container = document.querySelector(`.js-cart-item-container-${id}`);

    container.classList.add('is-updating-quantity');
  })
})

document.querySelectorAll('.js-save-quantity').forEach(saveQuantity => {
  saveQuantity.addEventListener('click', function() {
    let id = saveQuantity.dataset.productId;
    let container = document.querySelector(`.js-cart-item-container-${id}`);

    let inputElement = container.querySelector(`.js-quantity-input-${id}`);
    if (!inputElement) return;

    let newQuantity = Number(inputElement.value);

    updateProductQuantity(id,newQuantity);
    updateCartQuantity();

    cart.forEach(item => {
      if(id === item.productId){
        item.quantity = newQuantity;
      }
    })

    container.classList.remove('is-updating-quantity');

    document.querySelector('.js-quantity-label').innerHTML = newQuantity;
  })
})