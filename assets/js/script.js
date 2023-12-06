'use strict';



// ------ add event on element
const addEventOnElem = function(elem, type, callback) {
    if (elem.length > 1) {
        for (let i = 0; i < elem.length; i++) {
            elem[i].addEventListener(type, callback)
        }
    } else {
        elem.addEventListener(type, callback)
    }
}


// ------ navbar toggle
const navTogglers = document.querySelectorAll("[data-nav-toggler]")
const navbar = document.querySelector("[data-navbar]")
const navbarLinks = document.querySelectorAll("[data-nav-link]")
const overlay = document.querySelector("[data-overlay]")

const toggleNavbar = function() {
    navbar.classList.toggle("active")
    overlay.classList.toggle("active")
}

addEventOnElem(navTogglers, "click", toggleNavbar)

const closeNavbar = function() {
    navbar.classList.remove("active")
    overlay.classList.remove("active")
}

addEventOnElem(navbarLinks, "click", closeNavbar)
    // ------ header sticky & back top btn active
const header = document.querySelector("[data-header]")
const backTopBtn = document.querySelector("[data-back-top-btn]")

const headerActive = function() {
    if (window.scrollY > 150) {
        header.classList.add("active")
        backTopBtn.classList.add("active")
    } else {
        header.classList.remove("active")
        backTopBtn.classList.remove("active")
    }
}

addEventOnElem(window, "scroll", headerActive)

let lastScrollPos = 0

const headerSticky = function() {
    if (lastScrollPos >= window.scrollY) {
        header.classList.remove("header-hide")
    } else {
        header.classList.add("header-hide")
    }

    lastScrollPos = window.scrollY
}

addEventOnElem(window, "scroll", headerSticky)


// ------ scroll reveal effect
const section = document.querySelectorAll("[data-section]")

const scrollReveal = function() {
    for (let i = 0; i < section.length; i++) {
        if (section[i].getBoundingClientRect().top < window.innerHeight / 2) {
            section[i].classList.add("active")
        }
    }
}

scrollReveal()

addEventOnElem(window, "scroll", scrollReveal)