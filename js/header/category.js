document.addEventListener("DOMContentLoaded", function() {
    // Fetch data from category.json
    fetch("db/category.json")
        .then(response => response.json())
        .then(data => {
            // Call a function to create the category elements
            createCategoryElements(data);
        })
        .catch(error => console.error("Error fetching category data:", error));
});

function createCategoryElements(categories) {
    const categoryContainer = document.getElementById("categoryContainer");

    // Loop through categories and create elements
    categories.forEach(category => {
        const categoryItem = document.createElement("div");
        categoryItem.className = "category-item";

        const categoryImgBox = document.createElement("div");
        categoryImgBox.className = "category-img-box";
        const img = document.createElement("img");
        img.src = category.icon;
        img.alt = category.title;
        img.width = 30;
        categoryImgBox.appendChild(img);

        const categoryContentBox = document.createElement("div");
        categoryContentBox.className = "category-content-box";

        const categoryContentFlex = document.createElement("div");
        categoryContentFlex.className = "category-content-flex";

        const title = document.createElement("h3");
        title.className = "category-item-title";
        title.textContent = category.title;

        const amount = document.createElement("p");
        amount.className = "category-item-amount";
        amount.textContent = `(${category.amount})`;

        categoryContentFlex.appendChild(title);
        categoryContentFlex.appendChild(amount);

        const showAllBtn = document.createElement("a");
        showAllBtn.href = "#";
        showAllBtn.className = "category-btn";
        showAllBtn.textContent = "Show all";

        categoryContentBox.appendChild(categoryContentFlex);
        categoryContentBox.appendChild(showAllBtn);

        categoryItem.appendChild(categoryImgBox);
        categoryItem.appendChild(categoryContentBox);

        categoryContainer.appendChild(categoryItem);
    });
}