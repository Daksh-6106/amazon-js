export const cart = [];

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
}