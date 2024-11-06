document.addEventListener("DOMContentLoaded", function() {
    fetch("/db/productmain.json")
        .then(response => response.json())
        .then(data => displayProducts(data))
        .catch(error => console.error('Error fetching products:', error));
});

function displayProducts(products) {
    const productContainer = document.querySelector('.product-main');
    const productGrid = document.createElement("div");
    productGrid.className = "product-grid";
    productGrid.id = "root"

    products.forEach(product => {
        const showcase = document.createElement("div");
        showcase.className = "showcase";
        showcase.id = 'pon'
        showcase.setAttribute('value', `${product.name}`)
        showcase.setAttribute('onclick', 'productPage()')

        const showcaseBanner = document.createElement("div");
        showcaseBanner.className = "showcase-banner";

        const imgDefault = document.createElement("img");
        imgDefault.src = product.defaultImage;
        imgDefault.alt = product.name;
        imgDefault.width = 300;
        imgDefault.className = "product-img default";

        const imgHover = document.createElement("img");
        imgHover.src = product.hoverImage;
        imgHover.alt = product.name;
        imgHover.width = 300;
        imgHover.className = "product-img hover";

        const showcaseBadge = document.createElement("p");
        showcaseBadge.className = "showcase-badge";
        showcaseBadge.textContent = product.badge || ""; // Check if badge is available

        const showcaseActions = document.createElement("div");
        showcaseActions.className = "showcase-actions";

        const actions = ["heart-outline", "eye-outline", "repeat-outline", "bag-add-outline"];
        actions.forEach(action => {
            const button = document.createElement("button");
            button.className = "btn-action";
            const ionIcon = document.createElement("ion-icon");
            ionIcon.setAttribute("name", action);
            button.appendChild(ionIcon);
            showcaseActions.appendChild(button);
        });

        showcaseBanner.appendChild(imgDefault);
        showcaseBanner.appendChild(imgHover);
        showcaseBanner.appendChild(showcaseBadge);
        showcaseBanner.appendChild(showcaseActions);

        const showcaseContent = document.createElement("div");
        showcaseContent.className = "showcase-content";

        const categoryLink = document.createElement("a");
        categoryLink.href = "#";
        categoryLink.className = "showcase-category";
        categoryLink.textContent = product.category || ""; // Check if category is available

        const titleLink = document.createElement("a");
        titleLink.href = "#";
        const title = document.createElement("h3");
        title.className = "showcase-title";
        title.textContent = product.name || ""; // Check if name is available
        titleLink.appendChild(title);

        const rating = document.createElement("div");
        rating.className = "showcase-rating";
        for (let i = 0; i < 5; i++) {
            const starIcon = document.createElement("ion-icon");
            starIcon.setAttribute("name", i < product.rating ? "star" : "star-outline");
            rating.appendChild(starIcon);
        }

        const priceBox = document.createElement("div");
        priceBox.className = "price-box";

        const price = document.createElement("p");
        price.className = "price";
        price.textContent = `$${product.price || ""}`; // Check if price is available

        const del = document.createElement("del");
        del.textContent = `$${product.oldPrice || ""}`; // Check if oldPrice is available

        priceBox.appendChild(price);
        priceBox.appendChild(del);

        showcaseContent.appendChild(categoryLink);
        showcaseContent.appendChild(titleLink);
        showcaseContent.appendChild(rating);
        showcaseContent.appendChild(priceBox);

        showcase.appendChild(showcaseBanner);
        showcase.appendChild(showcaseContent);

        productGrid.appendChild(showcase);
    });

    productContainer.appendChild(productGrid);
}