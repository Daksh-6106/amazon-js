function Cart(){
    const cart = {
        cartItems: JSON.parse(localStorage.getItem('cart')) || [],
    
        saveToCart(){
            localStorage.setItem('cart', JSON.stringify(this.cartItems));
        },
    
        addToCart(id,quantitySelected){
    
            let matchingItem;
            this.cartItems.forEach((item) => {
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
        },
    
        removeCartItem(id) {
            for(let i=0;i<this.cartItems.length;i++){
                if(id === this.cartItems[i].productId){
                  this.cartItems.splice(i,1);
                }
              }
        
            saveToCart();
        },
        
        updateProductQuantity(id,newQuantity){
            let matchingItem;
            this.cartItems.forEach((item) => {
                if(id === item.productId){
                    matchingItem = item;
                }
            })
        
            if(matchingItem){
                matchingItem.quantity = newQuantity;
            }
        
            saveToCart();
        },
    
        calculateCartQuantity(){
            let totalQuantity = 0;
            this.cartItems.forEach(item => {
                totalQuantity += item.quantity;
            })
        
            return totalQuantity;
        },
    
        updateDeliveryOption(productId, deliveryOptionId){
            let matchingItem;
        
            this.cartItems.forEach((item) => {
                if(productId === item.productId){
                    matchingItem = item;
                }
            });
        
            matchingItem.deliveryOptionId = deliveryOptionId;
        
            saveToCart();
        }
    };


    return cart;
}
