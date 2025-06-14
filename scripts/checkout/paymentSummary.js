import { cart, calculateCartQuantity } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { addOrder } from "../../data/orders.js";

export function renderPaymentSummary(){
    let productPrice = 0;
    let shippingCost = 0;
    let totalBeforeTax = 0;

    cart.forEach(cartItem => {
        let product = getProduct(cartItem.productId);
        let rupees = 85*(Math.trunc(Number(product.priceCents)/100))
        let deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

        productPrice += rupees*cartItem.quantity;
        shippingCost += deliveryOption.cost;
    });
    totalBeforeTax = productPrice + shippingCost;

    const tax = (0.1*totalBeforeTax);
    const totalAfterTax = (tax + totalBeforeTax).toFixed(2);

    document.querySelector('.js-total-quantity').innerHTML = `Items (${calculateCartQuantity()}):`
    
    document.querySelector('.js-payment-summary-money').innerHTML = `₹${productPrice}`;
    document.querySelector('.js-shipping-cost').innerHTML = `₹${shippingCost}`;
    document.querySelector('.js-before-tax').innerHTML = `₹${totalBeforeTax}`;
    document.querySelector('.js-tax').innerHTML = `₹${tax.toFixed(2)}`;
    document.querySelector('.js-total-cost').innerHTML = `₹${totalAfterTax}`;
}

const button = document.querySelector('.place-order-button ');

button.addEventListener('click', async () => {
    try{
    const response = await fetch('https://supersimplebackend.dev/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cart: cart
        })
    })

    const order = await response.json();
    addOrder(order);

    } catch(error){
        console.log('Unexpected Error. Please try again')
    }

    window.location.href = 'order.html';
})