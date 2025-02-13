export const cart = [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 5
},{
    productId: "54e0eccd-8f36-462b-b68a-8182611d9add",
    quantity: 10
}];

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