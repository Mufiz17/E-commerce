document.addEventListener("DOMContentLoaded", function() {
    // Fetch data from footercategory.json
    fetch("/db/footercategory.json")
        .then(response => response.json())
        .then(data => {
            // Call function to generate dynamic content
            generateFooterCategory(data);
        })
        .catch(error => console.error("Error fetching data:", error));
});

function generateFooterCategory(data) {
    const container = document.querySelector(".footer-category .container");

    data.forEach(category => {
        const categoryBox = document.createElement("div");
        categoryBox.classList.add("footer-category-box");

        const categoryTitle = document.createElement("h3");
        categoryTitle.classList.add("category-box-title");
        categoryTitle.textContent = category.title;

        categoryBox.appendChild(categoryTitle);

        category.links.forEach(link => {
            const linkElement = document.createElement("a");
            linkElement.href = link.url;
            linkElement.classList.add("footer-category-link");
            linkElement.textContent = link.text;

            categoryBox.appendChild(linkElement);
        });

        container.appendChild(categoryBox);
    });
}