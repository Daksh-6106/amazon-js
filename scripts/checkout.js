import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch} from '../data/products.js';
import { loadCart } from "../data/cart.js";

/*Promises create a new thread of code, this allows js to handle multiple tasks at the same time*/
//Resolve lets us control when to go to the next step
// try catch can also be used with normal code

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

//There are 4 types of requests 
/*  GET - get something from the backend
    POST - create something
    PUT - update something
    DELETE - delete something
*/

async function loadPage(){
    try {
        // throw 'error'

        await loadProductsFetch();

        const variable = await new Promise((resolve,reject) => {                                           //variable = y;
            loadCart(() => {
                // reject('error3');
                resolve('y');
            })
        })

    } catch (error) {
        console.log("Unexpected error! Please try again");
    }

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
