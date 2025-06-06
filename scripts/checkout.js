import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import {loadProducts} from '../data/products.js';
import { loadCart } from "../data/cart.js";

/*Promises create a new thread of code, this allows js to handle multiple tasks at the same time*/
//Resolve lets us control when to go to the next step

Promise.all([
    new Promise((resolve) =>{                               
        loadProducts(() => {
            resolve('x');                                      
        })
    }),
    new Promise((resolve) => {
        loadCart(() => {
            resolve('y');
        })
    })

]).then((values) => {
    console.log(values);
    renderOrderSummary();
    renderPaymentSummary();
})


// new Promise((resolve) =>{                               
//     loadProducts(() => {
//         resolve('x');                                      
//     })

// }).then((value) => {
//     return new Promise((resolve) => {
//         loadCart(() => {
//             console.log(value);
//             resolve();
//         })
//     })

// }).then(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
// })

//Promises are better than callbacks as it does not cause too much nesting

// loadProducts(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
// });
