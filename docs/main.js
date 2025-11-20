// Variables
// Header
const menu = document.querySelector("#burger-menu");
const menuLnks = document.querySelector("#navigation");
const navLogo = document.querySelector("#navbar_logo");

// Modal
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

// Show active menu when scrolling
const sections = document.querySelectorAll("section");
const menuLinks = document.querySelectorAll(".navbar__links");

// MODAL //
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// Display Mobile Menu
const mobileMenu = () => {
  menu.classList.toggle("is-active");
  menuLnks.classList.toggle("active");
};

menu.addEventListener("click", mobileMenu);

// Show active menu when scrolling
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

    const headerOffset = document.querySelector("header").offsetHeight; // The height of the header
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    // Disable scroll highlighting temporarily
    isClickScrolling = true;

    // Remove highlight from all links first
    menuLinks.forEach((l) => l.classList.remove("highlight"));

    // Highlight the clicked link immediately
    link.classList.add("highlight");

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    // After scrolling finishes,  re-enable scroll listener
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

// HEADER & BOTTOM SECTION //

// PORTFOLIO SECTION //
// Data
const images = [
  "assets/portfolio/mc_donalds_logo.png",
  "assets/portfolio/ikea_logo.png",
  "assets/portfolio/xiaomi_logo.png",
];
const captions = ["McDonald's", "Ikea", "Xiaomi"];

const links = [
  "https://www.mcdonalds.com/de/de-de.html",
  "https://www.ikea.com/de/de/",
  "https://www.mi.com/de/",
];
let isOpen = false;

document.getElementById("btnPortfolio").addEventListener("click", function () {
  const container = document.querySelector(".img-with-text-frame");
  const button = this;

  if (!isOpen) {
    // Use a card as a template
    const template = container.querySelector(".img-with-text");
    if (!template) return;

    images.forEach((src, idx) => {
      // Clone the template
      const clone = template.cloneNode(true);

      clone.classList.add("extra-item");

      // Update link, image and caption inside the clone
      const link = clone.querySelector("a");
      const img = clone.querySelector("img");
      const caption = clone.querySelector("figcaption");

      if (link && links[idx]) {
        link.href = links[idx];
        link.target = "_blank";
      }

      if (img) img.src = src;
      if (img && captions[idx]) img.alt = captions[idx];
      if (caption && captions[idx]) caption.textContent = captions[idx];

      // Append clone to container
      container.appendChild(clone);
    });

    button.textContent = "See less";
    isOpen = true;
  } else {
    // Remove only the clones
    container.querySelectorAll(".extra-item").forEach((el) => el.remove());
    button.textContent = "See More";
    isOpen = false;
  }
});

// TESTIMONIAL SECTION //
const slider = function () {
  const track = document.querySelector(".testimonials__track");
  const slides = document.querySelectorAll(".testimonial");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  let currentSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const updateButtons = () => {
    btnLeft.classList.remove("slider__btn--active");
    btnRight.classList.remove("slider__btn--active");

    if (currentSlide === 0) {
      btnRight.classList.add("slider__btn--active");
    } else if (currentSlide === maxSlide - 1) {
      btnLeft.classList.add("slider__btn--active");
    } else {
      btnLeft.classList.add("slider__btn--active");
      btnRight.classList.add("slider__btn--active");
    }
  };

  const updateActiveSlide = () => {
    slides.forEach((slide, i) => {
      slide.classList.toggle("testimonial--active", i === currentSlide);
    });
  };

  const getSlideWidth = () => {
    const slideWidth = slides[0].offsetWidth;
    const gap = 24; // gap from scss

    if (window.innerWidth >= 1024) {
      return slideWidth + 32; // + gap from scss
    }
    return slideWidth + gap;
  };

  const goToSlide = function (slideNum) {
    const slideWidth = getSlideWidth();
    const translateValue = slideNum * slideWidth;
    track.style.transform = `translateX(-${translateValue}px)`;
    updateActiveSlide();
    updateButtons();
  };

  // Next slide
  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
  };

  const prevSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }
    goToSlide(currentSlide);
  };

  const init = function () {
    goToSlide(0);
  };
  init();

  // Recalculate on window resize
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      goToSlide(currentSlide);
    }, 250);
  });

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
  });
};

// HELP SECTION //
const initFAQ = function () {
  const faqIcons = document.querySelectorAll(".icon-svg[data-faq]");

  faqIcons.forEach((icon) => {
    icon.addEventListener("click", function () {
      const faqNumber = this.getAttribute("data-faq");
      const answer = document.querySelector(
        `[data-faq-content="${faqNumber}"]`
      );
      const isOpen = answer.classList.contains("active");

      // Close all other FAQs first -> accordion behavior
      document.querySelectorAll(".answer-content").forEach((otherAnswer) => {
        if (otherAnswer !== answer) {
          otherAnswer.classList.remove("active");
          otherAnswer.style.maxHeight = null;
        }
      });

      // Remove rotate class from all other icons
      faqIcons.forEach((otherIcon) => {
        if (otherIcon !== icon) {
          otherIcon.classList.remove("rotate");
        }
      });

      // Toggle the clicked FAQ
      if (!isOpen) {
        answer.classList.add("active");
        answer.style.maxHeight = answer.scrollHeight + "px";
        this.classList.add("rotate");
      } else {
        // Close
        answer.classList.remove("active");
        answer.style.maxHeight = null;
        this.classList.remove("rotate");
      }
    });
  });
};

// CALL FUNCTIONS //
slider();
initFAQ();
