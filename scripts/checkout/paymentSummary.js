import { cart, calculateCartQuantity } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";

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