document.addEventListener("DOMContentLoaded", function() {
    // Fetch data from category.json
    fetch("db/showcase.json")
        .then(response => response.json())
        .then(data => {
            // Process the data and generate HTML
            const productShowcase = document.getElementById("productShowcase");
            productShowcase.innerHTML = generateProductHTML(data);
        })
        .catch(error => console.error("Error fetching data:", error));
});

function generateProductHTML(categoryData) {
    let html = '<div class="product-showcase">';
    html += `<h3 class="showcase-heading">${categoryData.categoryName}</h3>`;
    html += '<div class="showcase-wrapper">';

    categoryData.products.forEach(product => {
        html += '<div class="showcase-container">';
        html += '<div class="showcase">';
        html += `<a href="#" class="showcase-img-box"><img src="${product.image}" alt="${product.name}" width="75" height="75" class="showcase-img"></a>`;
        html += '<div class="showcase-content">';
        html += `<a href="#"><h4 class="showcase-title">${product.name}</h4></a>`;
        html += '<div class="showcase-rating">';
        for (let i = 0; i < product.rating; i++) {
            html += '<ion-icon name="star"></ion-icon>';
        }
        html += `</div><div class="price-box"><del>${product.originalPrice}</del><p class="price">${product.discountedPrice}</p></div></div></div></div>`;
    });

    html += '</div></div>';
    return html;
}