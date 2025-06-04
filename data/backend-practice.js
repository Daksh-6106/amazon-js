const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://supersimplebackend.dev/products/first');

xhr.addEventListener('load', function () {
    console.log(xhr.response);
});

xhr.send()              //Async code so we need to add an event listener for response