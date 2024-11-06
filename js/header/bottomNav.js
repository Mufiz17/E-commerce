document.addEventListener("DOMContentLoaded", function() {
    // Load JSON data
    fetch('db/bottomNav.json')
        .then(response => response.json())
        .then(data => {
            // Create mobile bottom navigation
            const mobileBottomNavigation = document.querySelector('.mobileBottomNavigation');
            const navigationDiv = document.createElement('div');
            navigationDiv.classList.add('mobile-bottom-navigation');

            // Create buttons based on JSON data
            data.forEach(item => {
                const button = document.createElement('button');
                button.classList.add('action-btn');

                const icon = document.createElement('ion-icon');
                icon.setAttribute('name', item.iconName);

                button.appendChild(icon);

                if (item.hasCount) {
                    const countSpan = document.createElement('span');
                    countSpan.classList.add('count');
                    countSpan.textContent = '0';
                    button.appendChild(countSpan);
                }

                navigationDiv.appendChild(button);
            });

            mobileBottomNavigation.appendChild(navigationDiv);
        })
        .catch(error => console.error('Error loading JSON:', error));
});