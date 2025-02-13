import {cart} from '../data/cart.js';
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
    <div class="cart-item-container  js-cart-item-container-${matchingItem.productId}">
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
                    Quantity: <span class="quantity-label">${item.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
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

console.log(cartHTML);
document.querySelector(".js-order-summary").innerHTML = cartHTML;

document.querySelectorAll('.js-delete-product').forEach((productDelete) => {
    productDelete.addEventListener('click',function() {
        let id = productDelete.dataset.productId;
        
        for(let i=0;i<cart.length;i++){
          if(id === cart[i].productId){
            cart.splice(i,1);
          }
        }
        console.log(cart);

        let container = document.querySelector(`.js-cart-item-container-${id}`);
        container.remove();
    })
});

