document.addEventListener("DOMContentLoaded", function() {
    const headerMain = document.querySelector(".header-main");

    // Create container
    const container = document.createElement("div");
    container.className = "container";

    // Create logo
    const logoLink = document.createElement("a");
    logoLink.href = "index.html";
    logoLink.className = "header-logo";

    const logoImg = document.createElement("img");
    logoImg.src = "./images/logo.png";
    logoImg.alt = "Stb logo";
    logoImg.height = 100;

    logoLink.appendChild(logoImg);

    // Create search container
    const searchContainer = document.createElement("div");
    searchContainer.className = "header-search-container";

    const searchInput = document.createElement("input");
    searchInput.type = "search";
    searchInput.name = "search";
    searchInput.className = "search-field";
    searchInput.placeholder = "Enter your product name...";
    searchInput.id = "textSearch";

    const searchButton = document.createElement("button");
    searchButton.className = "search-btn";
    searchButton.innerHTML = '<ion-icon name="search-outline"></ion-icon>';
    searchButton.setAttribute('onclick', 'searchPage()')

    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(searchButton);

    // Create user actions container
    const userActionsContainer = document.createElement("div");
    userActionsContainer.className = "header-user-actions";

    // Create user action buttons
    const userActions = [
        { icon: "person-outline" },
        { icon: "heart-outline", count: 0 },
        { icon: "bag-handle-outline", count: 0 }
    ];

    userActions.forEach(action => {
        const button = document.createElement("button");
        button.className = "action-btn";
        button.innerHTML = `<ion-icon name="${action.icon}"></ion-icon>`;

        if (action.count !== undefined) {
            const countSpan = document.createElement("span");
            countSpan.className = "count";
            countSpan.textContent = action.count;
            button.appendChild(countSpan);
        }

        userActionsContainer.appendChild(button);
    });

    // Append all elements to headerMain
    container.appendChild(logoLink);
    container.appendChild(searchContainer);
    container.appendChild(userActionsContainer);
    headerMain.appendChild(container);
});