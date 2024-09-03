document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('product-container');

    fetch('products.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(products => {
            // Debug: Check the fetched data
            console.log('Products data:', products);

            if (!Array.isArray(products)) {
                throw new Error('Invalid JSON format: products is not an array');
            }

            products.forEach(product => {
                if (product.image && product.name && product.price) {
                    const productDiv = document.createElement('div');
                    productDiv.classList.add('product');

                    productDiv.innerHTML = `
                        <img src="${product.image}" alt="${product.name}">
                        <h2>${product.name}</h2>
                        <p>Price: ${product.price}</p>
                    `;

                    productContainer.appendChild(productDiv);
                } else {
                    console.error('Invalid product data:', product);
                }
            });
        })
        .catch(error => console.error('Error fetching product data:', error));
});
