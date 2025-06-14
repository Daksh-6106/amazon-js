export const cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveToCart(){
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(id,quantitySelected){

    let matchingItem;
    cart.forEach((item) => {
        if(id === item.productId){
            matchingItem = item;
        }
    })

    if(matchingItem){
        matchingItem.quantity += quantitySelected;
    }else{
        cart.push({
            productId: id,
            quantity: quantitySelected,
            deliveryOptionId: '1'
        })
    }

    saveToCart();
}

export function removeCartItem(id) {
    for(let i=0;i<cart.length;i++){
        if(id === cart[i].productId){
          cart.splice(i,1);
        }
      }

    saveToCart();
}

export function updateProductQuantity(id,newQuantity){
    let matchingItem;
    cart.forEach((item) => {
        if(id === item.productId){
            matchingItem = item;
        }
    })

    if(matchingItem){
        matchingItem.quantity = newQuantity;
    }

    saveToCart();
}

export function calculateCartQuantity(){
    let totalQuantity = 0;
    cart.forEach(item => {
        totalQuantity += item.quantity;
    })

    return totalQuantity;
}

export function updateDeliveryOption(productId, deliveryOptionId){
    let matchingItem;

    cart.forEach((item) => {
        if(productId === item.productId){
            matchingItem = item;
        }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    saveToCart();
}

export function loadCart(func){
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://supersimplebackend.dev/cart')

  xhr.send();

  xhr.addEventListener('load', () => {


    console.log(xhr.response);
    func();
  })
}