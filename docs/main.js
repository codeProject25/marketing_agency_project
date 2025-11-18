// Variables
const menu = document.querySelector("#burger-menu");
const menuLnks = document.querySelector("#navigation");
const navLogo = document.querySelector("#navbar_logo");

// HEADER //
// Display Mobile Menu
const mobileMenu = () => {
  menu.classList.toggle("is-active");
  menuLnks.classList.toggle("active");
};

menu.addEventListener("click", mobileMenu);

// Show active menu when scrolling
const sections = document.querySelectorAll("section");
const menuLinks = document.querySelectorAll(".navbar__links");

let isClickScrolling = false;

const highlightMenu = () => {
  if (isClickScrolling) return;
  let scrollPos = window.scrollY + window.innerHeight / 2;
  let found = false;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      // find the corresponding link by href
      const link = document.querySelector(
        `.navbar__links[href="#${section.id}"]`
      );
      if (!link) return; // safety check

      // remove highlight from all links
      menuLinks.forEach((l) => l.classList.remove("highlight"));
      // add highlight to current link
      link.classList.add("highlight");
      found = true;
    }
  });
  if (!found) {
    menuLinks.forEach((l) => l.classList.remove("highlight"));
  }
};

// Smooth scrolling for anchor links
menuLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const targetId = link.getAttribute("href").substring(1);
    const target = document.getElementById(targetId);
    if (!target) return;

    const headerOffset = document.querySelector("header").offsetHeight;
    // sticky header height
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    // disable scroll highlighting temporarily
    isClickScrolling = true;

    // remove highlight from all links first
    menuLinks.forEach((l) => l.classList.remove("highlight"));
    // highlight the clicked link immediately
    link.classList.add("highlight");

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
    // wait until scrolling finishes, then re-enable scroll listener
    const scrollCheck = setInterval(() => {
      if (Math.abs(window.scrollY - offsetPosition) < 2) {
        isClickScrolling = false;
        clearInterval(scrollCheck);
      }
    }, 20);

    // Close mobile menu after click
    menu.classList.remove("is-active");
    menuLnks.classList.remove("active");
  });
});
// Smooth scroll for logo
navLogo.addEventListener("click", (e) => {
  e.preventDefault();

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  // Close mobile menu if open
  menu.classList.remove("is-active");
  menuLnks.classList.remove("active");
});

window.addEventListener("scroll", highlightMenu);

// HERO SECTION //
