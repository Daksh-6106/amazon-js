const products = [{
    name:'Black and Gray Athletic Cotton Socks - 6 Pairs',
    image: 'images/athletic-cotton-socks-6-pairs.jpg',
    rating: {
        stars: 4.5,
        count: 87
    },
    price: 666,
}, {
    name: 'Basketball Size-7',
    image: 'images/intermediate-composite-basketball.jpg',
    rating: {
        stars: 4,
        count: 127,
    },
    price: 800
}, {
    name: 'Adults Plain Cotton T-Shirt - 2 Pack',
    image: 'images/adults-plain-cotton-tshirt-2-pack.jpg',
    rating: {
        stars: 4.5,
        count: 95,
    },
    price: 500
}];

let productsHTML = '';

products.forEach((product) => {
    productsHTML += `
        <div class="product-container">
                <div class="product-image-container">
                    <img src=${product.image}>
                </div>
                <div class="product-name  limit-to-2-lines">${product.name}</div>
                <div class="product-rating">
                    <img class="product-rating-stars" src="images/rating-${product.rating.stars * 10}.png">
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