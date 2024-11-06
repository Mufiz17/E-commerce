document.addEventListener("DOMContentLoaded", function() {
    fetch("db/productfeatured.json")
        .then(response => response.json())
        .then(data => renderProducts(data))
        .catch(error => console.error("Error fetching product data:", error));
});

function renderProducts(products) {
    const productFeaturedDiv = document.querySelector(".product-featured");

    const showcaseWrapper = document.createElement("div");
    showcaseWrapper.classList.add("showcase-wrapper", "has-scrollbar");

    productFeaturedDiv.appendChild(showcaseWrapper);

    products.forEach(product => {
        const showcaseContainer = document.createElement("div");
        showcaseContainer.classList.add("showcase-container");

        const showcase = document.createElement("div");
        showcase.classList.add("showcase");

        const showcaseBanner = document.createElement("div");
        showcaseBanner.classList.add("showcase-banner");
        const img = document.createElement("img");
        img.src = product.image;
        img.alt = product.title;
        img.classList.add("showcase-img");
        showcaseBanner.appendChild(img);

        const showcaseContent = document.createElement("div");
        showcaseContent.classList.add("showcase-content");

        const ratingDiv = document.createElement("div");
        ratingDiv.classList.add("showcase-rating");
        for (let i = 0; i < 5; i++) {
            const starIcon = document.createElement("ion-icon");
            starIcon.name = i < product.rating ? "star" : "star-outline";
            ratingDiv.appendChild(starIcon);
        }

        const titleLink = document.createElement("a");
        titleLink.href = "#";
        titleLink.innerHTML = `<h3 class="showcase-title">${product.title}</h3>`;

        const descriptionParagraph = document.createElement("p");
        descriptionParagraph.classList.add("showcase-desc");
        descriptionParagraph.textContent = product.description;

        const priceBox = document.createElement("div");
        priceBox.classList.add("price-box");
        priceBox.innerHTML = `<p class="price">$${product.price.toFixed(2)}</p><del>$${product.discountedPrice.toFixed(2)}</del>`;

        const addToCartButton = document.createElement("button");
        addToCartButton.classList.add("add-cart-btn");
        addToCartButton.textContent = "Add to cart";

        const statusDiv = document.createElement("div");
        statusDiv.classList.add("showcase-status");

        const statusWrapper = document.createElement("div");
        statusWrapper.classList.add("wrapper");
        statusWrapper.innerHTML = `<p>Already sold: <b>${product.sold}</b></p><p>Available: <b>${product.available}</b></p>`;

        const statusBar = document.createElement("div");
        statusBar.classList.add("showcase-status-bar");

        const countdownBox = document.createElement("div");
        countdownBox.classList.add("countdown-box");

        const countdownDesc = document.createElement("p");
        countdownDesc.classList.add("countdown-desc");
        countdownDesc.textContent = "Hurry Up! Offer ends in:";

        const countdownDiv = document.createElement("div");
        countdownDiv.classList.add("countdown");

        // Iterate over countdown properties and create countdown content dynamically
        for (const [unit, value] of Object.entries(product.countdown)) {
            const countdownContent = document.createElement("div");
            countdownContent.classList.add("countdown-content");

            const displayNumber = document.createElement("p");
            displayNumber.classList.add("display-number");
            displayNumber.textContent = value.toString();

            const displayText = document.createElement("p");
            displayText.classList.add("display-text");
            displayText.textContent = unit;

            countdownContent.appendChild(displayNumber);
            countdownContent.appendChild(displayText);
            countdownDiv.appendChild(countdownContent);
        }

        countdownBox.appendChild(countdownDesc);
        countdownBox.appendChild(countdownDiv);

        // Append elements to the showcase content
        showcaseContent.appendChild(ratingDiv);
        showcaseContent.appendChild(titleLink);
        showcaseContent.appendChild(descriptionParagraph);
        showcaseContent.appendChild(priceBox);
        showcaseContent.appendChild(addToCartButton);
        showcaseContent.appendChild(statusDiv);
        statusDiv.appendChild(statusWrapper);
        statusDiv.appendChild(statusBar);
        showcaseContent.appendChild(countdownBox);

        // Append elements to the showcase container
        showcase.appendChild(showcaseBanner);
        showcase.appendChild(showcaseContent);
        showcaseContainer.appendChild(showcase);
        showcaseWrapper.appendChild(showcaseContainer);
    });
}