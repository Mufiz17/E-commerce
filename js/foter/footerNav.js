document.addEventListener("DOMContentLoaded", function() {
    // Fetch data from JSON file
    fetch("/db/footernav.json")
        .then(response => response.json())
        .then(data => {
            // Build footer using the fetched data
            buildFooter(data);
        })
        .catch(error => console.error("Error fetching data:", error));
});

function buildFooter(data) {
    const footerElement = document.querySelector(".footer-nav .container");

    // Iterate through categories in JSON and create lists
    for (const category of data.categories) {
        const categoryList = document.createElement("ul");
        categoryList.classList.add("footer-nav-list");

        const titleItem = document.createElement("li");
        titleItem.classList.add("footer-nav-item");
        titleItem.innerHTML = `<h2 class="nav-title">${category.title}</h2>`;
        categoryList.appendChild(titleItem);

        for (const item of category.items) {
            const listItem = document.createElement("li");
            listItem.classList.add("footer-nav-item");
            listItem.innerHTML = `<a href="${item.link}" class="footer-nav-link">${item.name}</a>`;
            categoryList.appendChild(listItem);
        }

        footerElement.appendChild(categoryList);
    }
}

function searchPage() {
    let getInput = document.querySelector('#textSearch').value;
    window.open(`search.html?query=${getInput}`, '_self');
}

function productPage() {
    let getProduct = document.querySelector('#pon').value;
    window.open(`product.html?query=${getProduct}`, '_self');
}