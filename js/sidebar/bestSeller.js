// script.js

document.addEventListener("DOMContentLoaded", function() {
    // Fetch and load mobile navigation data
    fetch('mobileNav.json')
        .then(response => response.json())
        .then(data => {
            // Update mobile bottom navigation
            updateMobileBottomNavigation(data.bottomNavigation);

            // Update mobile navigation menu
            updateMobileNavigationMenu(data.navigationMenu);

            // Add event listeners for mobile menu functionality
            setupMobileMenu();
        })
        .catch(error => console.error('Error fetching mobile navigation data:', error));
});

function updateMobileBottomNavigation(data) {
    const mobileBottomNavigation = document.getElementById('mobileBottomNavigation');
    mobileBottomNavigation.innerHTML = ''; // Clear existing content
    data.forEach(button => {
        mobileBottomNavigation.appendChild(generateButton(button));
    });
}

function updateMobileNavigationMenu(data) {
    const mobileNavigationMenu = document.getElementById('mobileNavigationMenu');
    mobileNavigationMenu.innerHTML = ''; // Clear existing content
    mobileNavigationMenu.appendChild(generateMenu(data));
}

function setupMobileMenu() {
    const mobileMenuOpenBtns = document.querySelectorAll("[data-mobile-menu-open-btn]");
    const mobileMenuCloseBtns = document.querySelectorAll("[data-mobile-menu-close-btn]");
    const overlay = document.querySelector("[data-overlay]");

    mobileMenuOpenBtns.forEach(btn => {
        btn.addEventListener("click", function() {
            mobileMenu.classList.add("active");
            overlay.classList.add("active");
        });
    });

    function mobileMenuCloseFunc() {
        mobileMenu.classList.remove("active");
        overlay.classList.remove("active");
    }

    mobileMenuCloseBtns.forEach(btn => {
        btn.addEventListener("click", mobileMenuCloseFunc);
    });

    overlay.addEventListener("click", mobileMenuCloseFunc);
}

function generateButton(button) {
    const buttonElement = document.createElement('button');
    buttonElement.className = 'action-btn';
    if (button.dataAttr) {
        buttonElement.setAttribute(button.dataAttr, '');
    }

    const iconElement = document.createElement('ion-icon');
    iconElement.setAttribute('name', button.iconName);

    buttonElement.appendChild(iconElement);

    if (button.count) {
        const countElement = document.createElement('span');
        countElement.className = 'count';
        countElement.textContent = button.count;
        buttonElement.appendChild(countElement);
    }

    return buttonElement;
}

function generateSubMenuCategoryList(submenu) {
    const listElement = document.createElement('ul');
    listElement.className = 'submenu-category-list';
    submenu.forEach(item => {
        const listItem = document.createElement('li');
        listItem.className = 'submenu-category';
        const linkElement = document.createElement('a');
        linkElement.href = '#';
        linkElement.className = 'submenu-title';
        linkElement.textContent = item.title;
        listItem.appendChild(linkElement);
        listElement.appendChild(listItem);
    });
    return listElement;
}

function generateSocialLinks(socialLinks) {
    const listElement = document.createElement('ul');
    listElement.className = 'menu-social-container';
    socialLinks.forEach(link => {
        const listItem = document.createElement('li');
        const linkElement = document.createElement('a');
        linkElement.href = link.link;
        linkElement.className = 'social-link';
        const iconElement = document.createElement('ion-icon');
        iconElement.setAttribute('name', link.iconName);
        linkElement.appendChild(iconElement);
        listItem.appendChild(linkElement);
        listElement.appendChild(listItem);
    });
    return listElement;
}

function generateMenuCategory(category) {
    const listItem = document.createElement('li');
    listItem.className = 'menu-category';

    if (category.isLink) {
        const linkElement = document.createElement('a');
        linkElement.href = category.link;
        linkElement.className = 'menu-title';
        linkElement.textContent = category.title;
        listItem.appendChild(linkElement);
    } else {
        const buttonElement = document.createElement('button');
        buttonElement.className = 'accordion-menu';
        if (category.accordionBtnDataAttr) {
            buttonElement.setAttribute(category.accordionBtnDataAttr, '');
        }

        const titleElement = document.createElement('p');
        titleElement.className = 'menu-title';
        titleElement.textContent = category.title;

        buttonElement.appendChild(titleElement);

        if (category.caretBackIconName) {
            const caretBackIcon = document.createElement('ion-icon');
            caretBackIcon.setAttribute('name', category.caretBackIconName);
            caretBackIcon.className = 'caret-back';
            buttonElement.appendChild(caretBackIcon);
        }

        const submenuElement = generateSubMenuCategoryList(category.submenu);
        submenuElement.setAttribute('data-accordion', '');

        listItem.appendChild(buttonElement);
        listItem.appendChild(submenuElement);
    }

    return listItem;
}

function generateMenuCategoryList(categories) {
    const listElement = document.createElement('ul');
    categories.forEach(category => {
        const listItem = generateMenuCategory(category);
        listElement.appendChild(listItem);
    });
    return listElement;
}

function generateMenu(data) {
    const menuElement = document.createElement('nav');
    menuElement.className = 'mobile-navigation-menu has-scrollbar';
    if (data.menuTitle) {
        const topContainer = document.createElement('div');
        topContainer.className = 'menu-top';
        const titleElement = document.createElement('h2');
        titleElement.className = 'menu-title';
        titleElement.textContent = data.menuTitle;
        topContainer.appendChild(titleElement);
        menuElement.appendChild(topContainer);
    }

    const categoryList = generateMenuCategoryList(data.categories);
    categoryList.className = 'mobile-menu-category-list';
    menuElement.appendChild(categoryList);

    const bottomContainer = document.createElement('div');
    bottomContainer.className = 'menu-bottom';

    const bottomCategoryList = generateMenuCategoryList(data.bottomCategories);
    bottomCategoryList.className = 'menu-category-list';

    const socialContainer = generateSocialLinks(data.socialLinks);

    bottomContainer.appendChild(bottomCategoryList);
    bottomContainer.appendChild(socialContainer);

    menuElement.appendChild(bottomContainer);

    return menuElement;
}