import { fetchDOMElementByQuerySelector } from "./dom-utils.js";
let isSideNavVisible = true;
export function displaySideNav() {
    if (isSideNavVisible) {
        hideSideNav();
    }
    else {
        showSideNav();
    }
    isSideNavVisible = !isSideNavVisible;
}
const header_logo = fetchDOMElementByQuerySelector(".header-logo");
const side_arrow = fetchDOMElementByQuerySelector(".side-arrow img");
const main_nav = fetchDOMElementByQuerySelector(".main-navigation");
const side_nav = fetchDOMElementByQuerySelector(".side-navigation");
const main_body = fetchDOMElementByQuerySelector(".main-body");
function hideSideNav() {
    side_nav.classList.add("side-nav-close");
    side_nav.style.width = "6%";
    header_logo.style.width = "40px";
    header_logo.style.overflow = "hidden";
    side_arrow.style.rotate = "180deg";
    main_nav.style.width = "94%";
    main_body.style.width = "94%";
}
function showSideNav() {
    side_nav.classList.remove("side-nav-close");
    side_nav.style.width = "20%";
    header_logo.style.width = "18%";
    side_arrow.style.rotate = "360deg";
    main_nav.style.width = "80%";
    main_body.style.width = "80%";
}
