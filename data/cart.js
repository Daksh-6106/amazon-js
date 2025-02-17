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
            quantity: quantitySelected
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