import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch} from '../data/products.js';
import { loadCart } from "../data/cart.js";

/*Promises create a new thread of code, this allows js to handle multiple tasks at the same time*/
//Resolve lets us control when to go to the next step

// function loadPage(){
//     return new Promise((resolve) => {
//         console.log('load page');
//     }).then(() => {
//         return loadProductsFetch();
//     }).then(() => {
//         return new Promise((resolve) => {
//             resolve('abc');
//         })
//     })
// }

async function loadPage(){
    console.log('load page');

    await loadProductsFetch();

    const variable = await new Promise((resolve) => {                                           //variable = y;
        loadCart(() => {
            resolve('y');
        })
    })

    renderOrderSummary();
    renderPaymentSummary();    
}

loadPage();

/*
loadPage().then((value) => {
    console.log('next step');
    console.log(value);
}*/

/*
Promise.all([
    loadProductsFetch(),
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
*/


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
