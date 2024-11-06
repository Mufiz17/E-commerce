document.addEventListener("DOMContentLoaded", function() {
    // Fetch data from header.json
    fetch("/db/header.json")
        .then(response => response.json())
        .then(data => {
            // Create main container
            const container = document.createElement("div");
            container.classList.add("container");

            // Create social links container
            const socialContainer = document.createElement("ul");
            socialContainer.classList.add("header-social-container");

            // Insert social links
            data.socialLinks.forEach(link => {
                const listItem = document.createElement("li");
                const linkElement = document.createElement("a");
                linkElement.href = link.url;
                linkElement.classList.add("social-link");
                linkElement.innerHTML = `<ion-icon name="${link.icon}"></ion-icon>`;
                listItem.appendChild(linkElement);
                socialContainer.appendChild(listItem);
            });

            // Create alert news container
            const alertNewsContainer = document.createElement("div");
            alertNewsContainer.classList.add("header-alert-news");

            // Insert alert news
            const alertNewsParagraph = document.createElement("p");
            alertNewsParagraph.innerHTML = `<b>${data.alertNews.title}</b> ${data.alertNews.message}`;
            alertNewsContainer.appendChild(alertNewsParagraph);

            // Create top actions container
            const topActionsContainer = document.createElement("div");
            topActionsContainer.classList.add("header-top-actions");

            // Create currency selector
            const currencySelector = document.createElement("select");
            currencySelector.name = "currency";

            // Insert currency options
            data.currencies.forEach(currency => {
                const option = document.createElement("option");
                option.value = currency.value;
                option.innerHTML = `${currency.name} ${currency.symbol}`;
                currencySelector.appendChild(option);
            });

            // Create language selector
            const languageSelector = document.createElement("select");
            languageSelector.name = "language";

            // Insert language options
            data.languages.forEach(language => {
                const option = document.createElement("option");
                option.value = language.value;
                option.innerHTML = language.name;
                languageSelector.appendChild(option);
            });

            // Append all created elements to the main container
            topActionsContainer.appendChild(currencySelector);
            topActionsContainer.appendChild(languageSelector);

            container.appendChild(socialContainer);
            container.appendChild(alertNewsContainer);
            container.appendChild(topActionsContainer);

            // Get the header-top element and append the main container
            const headerTop = document.querySelector(".header-top");
            headerTop.appendChild(container);
        })
        .catch(error => console.error("Error fetching data:", error));
});

function generateSocialLinks(socialLinks) {
    return socialLinks.map(link => `
        <li>
            <a href="${link.url}" class="social-link">
                <ion-icon name="${link.icon}"></ion-icon>
            </a>
        </li>
    `).join('');
}

// Helper function to generate options for select elements
function generateOptions(options) {
    return options.map(option => `<option value="${option.value}">${option.label}</option>`).join('');
}