// Fetch data from JSON file
fetch('db/mobileNav.json')
    .then(response => response.json())
    .then(data => {
        const desktopNav = document.querySelector('.desktop-navigation-menu');
        desktopNav.appendChild(createMenuElement(data));
    })
    .catch(error => console.error('Error fetching data:', error));

// Function to create HTML for the navigation menu
// Function to create HTML for the navigation menu
function createMenuElement(data) {
    const ulElement = document.createElement('ul');
    ulElement.classList.add('desktop-menu-category-list');

    data.forEach(category => {
        const liElement = document.createElement('li');
        liElement.classList.add('menu-category');

        const aElement = document.createElement('a');
        aElement.href = '#';
        aElement.classList.add('menu-title');
        aElement.textContent = category.title;
        liElement.appendChild(aElement);

        if (category.subcategories && category.subcategories.length > 0) {
            const dropdownPanel = document.createElement('div');
            dropdownPanel.classList.add('dropdown-panel');

            const dropdownPanelList = document.createElement('ul');
            dropdownPanelList.classList.add('dropdown-panel-list');

            category.subcategories.forEach(subcategory => {
                const subcategoryLi = document.createElement('li');
                subcategoryLi.classList.add('menu-title');

                const subcategoryA = document.createElement('a');
                subcategoryA.href = '#';
                subcategoryA.textContent = subcategory.title;
                subcategoryLi.appendChild(subcategoryA);

                if (subcategory.items && subcategory.items.length > 0) {
                    const dropdownList = document.createElement('ul');
                    dropdownList.classList.add('dropdown-list');

                    subcategory.items.forEach(item => {
                        const itemLi = document.createElement('li');
                        itemLi.classList.add('dropdown-item');

                        const itemA = document.createElement('a');
                        itemA.href = '#';
                        itemA.textContent = item;

                        itemLi.appendChild(itemA);
                        dropdownList.appendChild(itemLi);
                    });

                    subcategoryLi.appendChild(dropdownList);
                }

                dropdownPanelList.appendChild(subcategoryLi);
            });

            dropdownPanel.appendChild(dropdownPanelList);
            liElement.appendChild(dropdownPanel);
        }

        ulElement.appendChild(liElement);
    });

    return ulElement;
}