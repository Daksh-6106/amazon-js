let productsHTML = '';

products.forEach((product) => {
    productsHTML += `
        <div class="product-container">
                <div class="product-image-container">
                    <img src=${product.image}>
                </div>
                <div class="product-name  limit-to-2-lines">${product.name}</div>
                <div class="product-rating">
                    <img class="product-rating-stars" src="images/rating/rating-${product.rating.stars * 10}.png">
                    <div class="product-rating-count">${product.rating.count}</div>
                </div>
                <div class="product-price">₹${product.price}</div>
                <div class="product-quantity">
                    <select class="product-quantity-select">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>
                <div class="js-added-to-cart"> 
                    <img>
                </div>
                <div>
                    <button class="product-add-to-cart  js-add-to-cart-button" data-product-id="${product.id}">Add to Cart</button>
                </div>
        </div>
        `;
})

document.querySelector(".js-products-grid").innerHTML = productsHTML;

let totalQuantity =0    ;

document.querySelectorAll('.js-add-to-cart-button').forEach((button) => {
    button.onclick = function() {
       let id = button.dataset.productId;

        let matchingItem;
        cart.forEach((item) => {
            if(id === item.productId){
                matchingItem = item;
            }
        })

        if(matchingItem){
            matchingItem.quantity += 1;
        }else{
            cart.push({
                productId: id,
                quantity: 1
            })
        }

        totalQuantity += 1;
        document.querySelector('.js-cart-quantity').innerHTML = totalQuantity;
    }
})