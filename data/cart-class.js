class Cart{
    cartItems = undefined;
    localStorageKey = undefined;

    constructor(localStorageKey){
        this.localStorageKey = localStorageKey;
        this.loadFromStorage();
    }

    saveToCart(){
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
    }

    loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));
    
        if (!this.cartItems) {
          this.cartItems = [];
        }
      }

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
            this.cartItems.push({
                productId: id,
                quantity: quantitySelected,
                deliveryOptionId: '1'
            })
        }
    
        this.saveToCart();
    }

    removeCartItem(id) {
        for(let i=0;i<this.cartItems.length;i++){
            if(id === this.cartItems[i].productId){
              this.cartItems.splice(i,1);
            }
          }
    
        this.saveToCart();
    }

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
    
        this.saveToCart();
    }

    calculateCartQuantity(){
        let totalQuantity = 0;
        this.cartItems.forEach(item => {
            totalQuantity += item.quantity;
        })
    
        return totalQuantity;
    }

    updateDeliveryOption(productId, deliveryOptionId){
        let matchingItem;
    
        this.cartItems.forEach((item) => {
            if(productId === item.productId){
                matchingItem = item;
            }
        });
    
        matchingItem.deliveryOptionId = deliveryOptionId;
    
        this.saveToCart();
    }
}

const cart = new Cart('cart');
//This is an instance of the class