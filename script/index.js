let sideNav=true;
function displaySideNav(){
    if(sideNav){
        hideSideNav();
    }
    else{
        showSideNav();
    }
    sideNav=!sideNav;
}

const header_logo=document.querySelector(".header-logo");
const side_arrow=document.querySelector(".side-arrow img");
const main_nav=document.querySelector(".main-navigation");
const side_nav=document.querySelector(".side-navigation");
const main_body=document.querySelector(".main-body");

function hideSideNav(){
    side_nav.classList.add("side-nav-close");
    header_logo.style.width="40px";
    header_logo.style.overflow="hidden";
    side_arrow.style.rotate="180deg";
    main_nav.style.width="94%";
    side_nav.style.width="6%";
    main_body.style.width="94%";
}

function showSideNav(){
    side_nav.classList.remove("side-nav-close");
    header_logo.style.width="18%";
    side_arrow.style.rotate="360deg";
    main_nav.style.width="80%";
    side_nav.style.width="20%";
    main_body.style.width="80%";
}

