import {cart, removeCartItem, updateProductQuantity, calculateCartQuantity, updateDeliveryOption} from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';


export function renderOrderSummary() {
  let cartHTML = ``;

  cart.forEach((item) => {
      
    const productId = item.productId;

    let matchingItem = getProduct(productId);

    const deliveryOptionId = item.deliveryOptionId;
    let deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.days ,'day').format('dddd MMMM D')

    cartHTML += ` 
    <div class="cart-item-container  js-cart-item-container-${matchingItem.id}" data-product-id=${matchingItem.id}>
        <div class="delivery-date">
          Delivery date: ${deliveryDate}
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

            ${deliveryOptionsHtml(matchingItem)}
          </div>
        </div>
      </div>
    </div>
    `;
  });

  updateCartQuantity();


  function deliveryOptionsHtml(cartItem){
    let html = ``;

    deliveryOptions.forEach(option => {

      const today = dayjs();
      const deliveryDate = today.add(option.days,'day').format('dddd, MMMM D');
      const priceString = option.cost === 0
      ? 'FREE'
      : `₹${option.cost} -`;

      let isChecked = option.id === cartItem.deliveryOptionId;

      html += `
            <div class="delivery-option  js-delivery-option" data-product-id = ${cartItem.id} data-option-id = ${option.id}>
              <input type="radio" 
                ${isChecked ? 'checked' : ''}
                class="delivery-option-input"
                name="delivery-option-${cartItem.id}">
              <div>
                <div class="delivery-option-date">
                  ${deliveryDate}
                </div>
                <div class="delivery-option-price">
                  ${priceString} Shipping
                </div>
              </div>
            </div>
            `
    })

    return html;
  }


  document.querySelector(".js-order-summary").innerHTML = cartHTML;

  document.querySelectorAll('.js-delete-product').forEach((productDelete) => {
      productDelete.addEventListener('click',function() {
        let id = productDelete.dataset.productId;
          
        removeCartItem(id);

        let container = document.querySelector(`.js-cart-item-container-${id}`);
        container.remove();

        renderPaymentSummary();
        updateCartQuantity();
      })
  });


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

      let quantitySelected = Number(inputElement.value);

      container.classList.remove('is-updating-quantity');

      document.querySelector('.js-quantity-label').innerHTML = quantitySelected;

      updateProductQuantity(id,quantitySelected);
      updateCartQuantity();
      renderPaymentSummary();
    })
  })

  function updateCartQuantity(){
    const cartQuantity = calculateCartQuantity();
    document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} items`;
  }


  document.querySelectorAll('.js-delivery-option').forEach(deliveryOption => {
    deliveryOption.addEventListener('click', function() {

      let productId = deliveryOption.dataset.productId;
      let deliveryOptionId = deliveryOption.dataset.optionId;

      updateDeliveryOption(productId, deliveryOptionId);

      renderPaymentSummary();
      renderOrderSummary();
    });
  });

}