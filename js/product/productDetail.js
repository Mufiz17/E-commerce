document.addEventListener('DOMContentLoaded', function() {
    fetch('db/productDetail.json')
        .then(response => response.json())
        .then(data => {
            const product = data.product;

            // Set product details
            document.getElementById('productName').innerText = product.name;
            document.getElementById('productPrice').innerText = product.price;
            document.getElementById('productDescription').innerText = product.description;

            // Set product rating
            const productRating = document.getElementById('productRating');
            for (let i = 0; i < product.rating.stars; i++) {
                const star = document.createElement('span');
                star.innerHTML = '<i class="fas fa-star"></i>';
                productRating.appendChild(star);
            }
            if (product.rating.halfStar) {
                const halfStar = document.createElement('span');
                halfStar.innerHTML = '<i class="fas fa-star-half-alt"></i>';
                productRating.appendChild(halfStar);
            }
            const ratingsSpan = document.createElement('span');
            ratingsSpan.innerText = `(${product.rating.ratings} ratings)`;
            productRating.appendChild(ratingsSpan);

            // Set product images
            const mainImage = document.getElementById('mainImage');
            const thumbnailContainer = document.getElementById('thumbnailContainer');
            product.images.forEach((image, index) => {
                const thumbnail = createThumbnail(image);
                thumbnailContainer.appendChild(thumbnail);

                // Add click event for image change
                thumbnail.addEventListener('click', () => {
                    mainImage.src = image;
                    resetActiveImg();
                    thumbnail.classList.add('active');
                });

                // Add mouseover event for image change
                thumbnail.addEventListener('mouseover', () => {
                    mainImage.src = image;
                    resetActiveImg();
                    thumbnail.classList.add('active');
                });

                // Set the first image as active by default
                if (index === 0) {
                    mainImage.src = image; // Set the default image source
                    thumbnail.classList.add('active');
                }
            });
        })
        .catch(error => console.error('Error fetching product details:', error));
});

function createThumbnail(imageSrc) {
    const thumbnail = document.createElement('div');
    thumbnail.innerHTML = `<img src="${imageSrc}" alt="watch">`;
    return thumbnail;
}

function resetActiveImg() {
    const allThumbnails = document.querySelectorAll('.hover-container div');
    allThumbnails.forEach(thumbnail => {
        thumbnail.classList.remove('active');
    });
}