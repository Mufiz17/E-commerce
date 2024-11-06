document.addEventListener("DOMContentLoaded", function() {
    // Load JSON data
    fetch('db/mobile.json')
        .then(response => response.json())
        .then(data => {
            // Create mobile navigation menu
            const mobileNavigationMenu = document.querySelector('.mobileNavigationMenu');
            const menuNav = document.createElement('nav');
            menuNav.classList.add('mobile-navigation-menu', 'has-scrollbar');
            menuNav.setAttribute('data-mobile-menu', '');

            // Create menu top
            const menuTop = document.createElement('div');
            menuTop.classList.add('menu-top');

            const menuTitle = document.createElement('h2');
            menuTitle.classList.add('menu-title');
            menuTitle.textContent = 'Menu';

            const menuCloseBtn = document.createElement('button');
            menuCloseBtn.classList.add('menu-close-btn');
            menuCloseBtn.setAttribute('data-mobile-menu-close-btn', '');

            const closeIcon = document.createElement('ion-icon');
            closeIcon.setAttribute('name', 'close-outline');

            menuCloseBtn.appendChild(closeIcon);
            menuTop.appendChild(menuTitle);
            menuTop.appendChild(menuCloseBtn);

            menuNav.appendChild(menuTop);

            // Create menu categories
            const menuCategoryList = document.createElement('ul');
            menuCategoryList.classList.add('mobile-menu-category-list');

            data.forEach(category => {
                const menuCategory = document.createElement('li');
                menuCategory.classList.add('menu-category');

                if (category.submenu) {
                    const accordionBtn = document.createElement('button');
                    accordionBtn.classList.add('accordion-menu');
                    accordionBtn.setAttribute('data-accordion-btn', '');

                    const categoryTitle = document.createElement('p');
                    categoryTitle.classList.add('menu-title');
                    categoryTitle.textContent = category.title;

                    const accordionIconsDiv = document.createElement('div');
                    accordionIconsDiv.innerHTML = `
              <ion-icon name="add-outline" class="add-icon"></ion-icon>
              <ion-icon name="remove-outline" class="remove-icon"></ion-icon>
            `;

                    accordionBtn.appendChild(categoryTitle);
                    accordionBtn.appendChild(accordionIconsDiv);

                    const submenuList = document.createElement('ul');
                    submenuList.classList.add('submenu-category-list');
                    submenuList.setAttribute('data-accordion', '');

                    category.submenu.forEach(submenuItem => {
                        const submenuItem = document.createElement('li');
                        submenuItem.classList.add('submenu-category');

                        const submenuTitle = document.createElement('a');
                        submenuTitle.classList.add('submenu-title');
                        submenuTitle.setAttribute('href', submenuItem.link);
                        submenuTitle.textContent = submenuItem.title;

                        submenuItem.appendChild(submenuTitle);
                        submenuList.appendChild(submenuItem);
                    });

                    menuCategory.appendChild(accordionBtn);
                    menuCategory.appendChild(submenuList);
                } else {
                    const categoryTitle = document.createElement('a');
                    categoryTitle.classList.add('menu-title');
                    categoryTitle.setAttribute('href', category.link);
                    categoryTitle.textContent = category.title;

                    menuCategory.appendChild(categoryTitle);
                }

                menuCategoryList.appendChild(menuCategory);
            });

            menuNav.appendChild(menuCategoryList);

            const mobileMenuOpenBtn = document.querySelectorAll(
                "[data-mobile-menu-open-btn]"
            );
            const mobileMenu = document.querySelector("[data-mobile-menu]");
            const mobileMenuCloseBtn = document.querySelectorAll(
                "[data-mobile-menu-close-btn]"
            );
            const overlay = document.querySelector("[data-overlay]");

            for (let i = 0; i < mobileMenuOpenBtn.length; i++) {
                const mobileMenuCloseFunc = function() {
                    mobileMenu.classList.remove("active");
                    overlay.classList.remove("active");
                };

                mobileMenuOpenBtn[i].addEventListener("click", function() {
                    mobileMenu.classList.add("active");
                    overlay.classList.add("active");
                });

                mobileMenuCloseBtn[i].addEventListener("click", mobileMenuCloseFunc);
                overlay.addEventListener("click", mobileMenuCloseFunc);
            }

            // Create menu bottom
            const menuBottom = document.createElement('div');
            menuBottom.classList.add('menu-bottom');

            // Create language and currency categories
            const menuCategoryListBottom = document.createElement('ul');
            menuCategoryListBottom.classList.add('menu-category-list');

            ['Language', 'Currency'].forEach(title => {
                const category = document.createElement('li');
                category.classList.add('menu-category');

                const accordionBtn = document.createElement('button');
                accordionBtn.classList.add('accordion-menu');
                accordionBtn.setAttribute('data-accordion-btn', '');

                const categoryTitle = document.createElement('p');
                categoryTitle.classList.add('menu-title');
                categoryTitle.textContent = title;

                const caretIcon = document.createElement('ion-icon');
                caretIcon.setAttribute('name', 'caret-back-outline');
                caretIcon.classList.add('caret-back');

                accordionBtn.appendChild(categoryTitle);
                accordionBtn.appendChild(caretIcon);

                const submenuList = document.createElement('ul');
                submenuList.classList.add('submenu-category-list');
                submenuList.setAttribute('data-accordion', '');

                const accordionBttn = document.querySelectorAll("[data-accordion-btn]");
                const accordion = document.querySelectorAll("[data-accordion]");

                for (let i = 0; i < accordionBttn.length; i++) {
                    accordionBttn[i].addEventListener("click", function() {
                        const clickedBtn = this.nextElementSibling.classList.contains("active");

                        for (let i = 0; i < accordion.length; i++) {
                            if (clickedBtn) break;

                            if (accordion[i].classList.contains("active")) {
                                accordion[i].classList.remove("active");
                                accordionBttn[i].classList.remove("active");
                            }
                        }

                        this.nextElementSibling.classList.toggle("active");
                        this.classList.toggle("active");
                    });
                }


                // Add language and currency options
                ['English', 'Español', 'French'].forEach(option => {
                    const submenuItem = document.createElement('li');
                    submenuItem.classList.add('submenu-category');

                    const submenuTitle = document.createElement('a');
                    submenuTitle.classList.add('submenu-title');
                    submenuTitle.setAttribute('href', submenuItem.link);
                    submenuTitle.textContent = option;

                    submenuItem.appendChild(submenuTitle);
                    submenuList.appendChild(submenuItem);
                });

                category.appendChild(accordionBtn);
                category.appendChild(submenuList);
                menuCategoryListBottom.appendChild(category);
            });

            menuBottom.appendChild(menuCategoryListBottom);

            // Create social links
            const socialLinksList = document.createElement('ul');
            socialLinksList.classList.add('menu-social-container');

            ['logo-facebook', 'logo-twitter', 'logo-instagram', 'logo-linkedin'].forEach(iconName => {
                const socialLink = document.createElement('li');
                const link = document.createElement('a');
                link.classList.add('social-link');
                link.setAttribute('href', '#');

                const icon = document.createElement('ion-icon');
                icon.setAttribute('name', iconName);

                link.appendChild(icon);
                socialLink.appendChild(link);
                socialLinksList.appendChild(socialLink);
            });

            menuBottom.appendChild(socialLinksList);
            menuNav.appendChild(menuBottom);

            mobileNavigationMenu.appendChild(menuNav);
        })
        .catch(error => console.error('Error loading JSON:', error));
});