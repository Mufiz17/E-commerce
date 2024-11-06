document.addEventListener("DOMContentLoaded", function() {
    // Fetch data from JSON file
    fetch('/db/banner.json')
        .then(response => response.json())
        .then(data => {
            const bannerSlider = document.getElementById('bannerSlider');
            data.forEach(item => {
                // Create slider item
                const sliderItem = document.createElement('div');
                sliderItem.className = 'slider-item';

                // Create image element
                const img = document.createElement('img');
                img.src = item.imageSrc;
                img.alt = item.altText;
                img.className = 'banner-img';

                // Create banner content
                const bannerContent = document.createElement('div');
                bannerContent.className = 'banner-content';

                // Populate banner content
                bannerContent.innerHTML = `
                    <p class="banner-subtitle">${item.subtitle}</p>
                    <h2 class="banner-title">${item.title}</h2>
                    <p class="banner-text">starting at &dollar; <b>${item.price}</b></p>
                    <a href="${item.link}" class="banner-btn">Shop now</a>
                `;

                // Append elements to slider item
                sliderItem.appendChild(img);
                sliderItem.appendChild(bannerContent);

                // Append slider item to slider container
                bannerSlider.appendChild(sliderItem);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});