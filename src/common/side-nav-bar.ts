import { fetchDOMElementByQuerySelector } from "./dom-utils.js";

let isSideNavVisible:boolean=true;
export function displaySideNav():void{
    if(isSideNavVisible){
        hideSideNav();
    }
    else{
        showSideNav();
    }
    isSideNavVisible=!isSideNavVisible;
}

const header_logo=fetchDOMElementByQuerySelector<HTMLElement>(".header-logo");
const side_arrow=fetchDOMElementByQuerySelector<HTMLElement>(".side-arrow img");
const main_nav=fetchDOMElementByQuerySelector<HTMLElement>(".main-navigation");
const side_nav=fetchDOMElementByQuerySelector<HTMLElement>(".side-navigation");
const main_body=fetchDOMElementByQuerySelector<HTMLElement>(".main-body");

function hideSideNav():void{
    side_nav.classList.add("side-nav-close");
    side_nav.style.width="6%";
    header_logo.style.width="40px";
    header_logo.style.overflow="hidden";
    side_arrow.style.rotate="180deg";
    main_nav.style.width="94%";
    main_body.style.width="94%";
}

function showSideNav():void{
    side_nav.classList.remove("side-nav-close");
    side_nav.style.width="20%";
    header_logo.style.width="18%";
    side_arrow.style.rotate="360deg";
    main_nav.style.width="80%";
    main_body.style.width="80%";
}