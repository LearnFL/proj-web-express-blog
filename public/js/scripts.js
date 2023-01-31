import CoursesView from "./JS.Views/coursesView.js";
import BooksView from "./JS.Views/booksView.js";
import ProjectsView from "./JS.Views/projectsView.js";

// BLOCK FOOTER COPYRIGHT YEAR

const copyRight = document.getElementById("copy-right");
if (copyRight) copyRight.textContent += " " + new Date().getFullYear();

// BLOCK INDEX PAGE, ICONS SCROLL INTO VIEW EFFECT

const iconsContainer = document.querySelector(".icons-index-page");

if (iconsContainer) {
  iconsContainer.classList.add("section--hidden__side");
}

window.onload = () => {
  if (iconsContainer) {
    iconsContainer.classList.remove("section--hidden__side");
  }
};

// BLOCK INDEX PAGE, ICONS FADE OUT EFFECT

const icons = document.querySelector(".icons-index-page");
const handleHover = function (e) {
  if (e.target.classList.contains("icon-index")) {
    const link = e.target;
    const siblings = e.target
      .closest(".icons-index-page")
      .querySelectorAll(".icon-index");
    siblings.forEach((sib) => {
      if (sib !== link) {
        sib.style.opacity = this;
      }
    });
  }
};

if (icons) {
  icons.addEventListener("mouseover", handleHover.bind(0.5));
  icons.addEventListener("mouseout", handleHover.bind(1));
}

// BLOCK ABOUT PAGE, SECTION SCROLL INTO VIEW EFFECT

const sections = document.querySelectorAll(".section");

const obsOptions = {
  root: null,
  threshold: 0,
};

const revealSelections = function (entries, observer) {
  entries.forEach((entry) => {
    if (
      entry.target.classList.contains("section--hidden") &&
      entry.isIntersecting
    ) {
      entry.target.classList.remove("section--hidden");
      observer.unobserve(entry.target);
    } else return;
  });
};

if ("IntersectionObserver" in window && sections) {
  const sectionObserver = new IntersectionObserver(
    revealSelections,
    obsOptions
  );
  sections.forEach((s) => {
    sectionObserver.observe(s);
    s.classList.add("section--hidden");
  });
}

// BLOCK PROJECT PAGE, RENDER TILES AND LAZY LOADING

ProjectsView.renderProjectTiles();
ProjectsView.lazyImageLoader();

// BLOCK ABOUT PAGE, RENDER COURSES AND BOOKS

// Render courses and books
CoursesView.coursesHandler();
BooksView.coursesHandler();

// Button events for courses and books
CoursesView.eventHandler();
BooksView.eventHandler();
