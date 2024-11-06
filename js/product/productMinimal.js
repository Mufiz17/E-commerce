document.addEventListener('DOMContentLoaded', function() {
    // Fetch product minimal data from JSON file
    fetch('db/productminimal.json')
        .then(response => response.json())
        .then(data => {
            // Loop through product showcases
            data.forEach(productShowcase => {
                // Create product showcase container
                const showcaseContainer = document.createElement('div');
                showcaseContainer.className = 'product-showcase';

                // Add title to the product showcase
                const title = document.createElement('h2');
                title.className = 'title';
                title.innerText = productShowcase.title;
                showcaseContainer.appendChild(title);

                // Create showcase wrapper with scrollbar
                const showcaseWrapper = document.createElement('div');
                showcaseWrapper.className = 'showcase-wrapper has-scrollbar';

                // Loop through showcase containers
                productShowcase.showcaseContainers.forEach(showcaseContainerData => {
                    // Create showcase container
                    const container = document.createElement('div');
                    container.className = 'showcase-container';

                    // Loop through individual showcases
                    showcaseContainerData.forEach(product => {
                        // Create individual showcase
                        const showcase = document.createElement('div');
                        showcase.className = 'showcase';
                        showcase.id = "pres";
                        showcase.setAttribute('onclick', 'productPage()')

                        // Create image box
                        const imgBox = document.createElement('a');
                        imgBox.href = product.link;
                        imgBox.className = 'showcase-img-box';

                        // Create image
                        const img = document.createElement('img');
                        img.src = product.image;
                        img.alt = product.title;
                        img.width = 70;
                        img.className = 'showcase-img';

                        // Create content
                        const content = document.createElement('div');
                        content.className = 'showcase-content';

                        // Create title
                        const title = document.createElement('h4');
                        title.className = 'showcase-title';
                        const titleLink = document.createElement('a');
                        titleLink.href = product.link;
                        titleLink.innerText = product.title;
                        title.appendChild(titleLink);

                        // Create category
                        const category = document.createElement('a');
                        category.href = product.categoryLink;
                        category.className = 'showcase-category';
                        category.innerText = product.category;

                        // Create price box
                        const priceBox = document.createElement('div');
                        priceBox.className = 'price-box';
                        const price = document.createElement('p');
                        price.className = 'price';
                        price.innerText = `$${product.price.toFixed(2)}`;
                        const del = document.createElement('del');
                        del.innerText = `$${product.originalPrice.toFixed(2)}`;

                        // Append elements to the DOM
                        imgBox.appendChild(img);
                        content.appendChild(title);
                        content.appendChild(category);
                        priceBox.appendChild(price);
                        priceBox.appendChild(del);
                        content.appendChild(priceBox);
                        showcase.appendChild(imgBox);
                        showcase.appendChild(content);
                        container.appendChild(showcase);
                    });

                    // Append showcase container to the wrapper
                    showcaseWrapper.appendChild(container);
                });

                // Append showcase wrapper to the product showcase container
                showcaseContainer.appendChild(showcaseWrapper);

                // Append product showcase container to the main container
                document.querySelector('.product-minimal').appendChild(showcaseContainer);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});