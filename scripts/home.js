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
                <div class="js-add-to-cart-button">
                    <button class="product-add-to-cart">Add to Cart</button>
                </div>
        </div>
        `;

})

document.querySelector(".js-products-grid").innerHTML = productsHTML;