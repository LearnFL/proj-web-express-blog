import { projects } from "./projects.js";

class ProjectsView {
  _parentEl = document.querySelector(".project-tile-container");
  _lazyPlaceHolderUrl =
    "https://res.cloudinary.com/hsuwjpm5m/image/upload/v1674428663/drWebSite/479A39C5-22BA-46E1-BC95-71C9FC658693_akojvg.png";

  renderProjectTiles() {
    if (!this._parentEl) return;
    let html;
    projects.forEach((proj) => {
      if (!proj.additionalIMG) {
        // prettier-ignore
        html = `
          <div class="card-bottom-margin col-lg-6">
              <div class="project-card">
                  <figure>
                  <img class="project-image lazy-image ${proj.class ? proj.class : ""}" 
                  data-src="${proj.imgURL}" src="${this._lazyPlaceHolderUrl}" alt="${proj.alt}">
                  <figcaption class="proj-${proj.id}"> ${proj.description}</figcaption>
                  </figure>
              </div>
          </div>
      `;
      }

      if (proj.additionalIMG) {
        // prettier-ignore
        html = `
          <div class="card-bottom-margin col-lg-6">
              <div class="project-card">
                  <figure>
                  <img class="project-image lazy-image ${proj.class ? proj.class : ""}" data-src="${proj.imgURL}" 
                  src="${this._lazyPlaceHolderUrl}" alt="${proj.alt}">
                  <figcaption class="proj-${proj.id}"> 
                 
                  <div style="text-align:center;">
                   ${
                    proj.additionalIMG.map((img, i)=>{
  
                      return i !== (proj.additionalIMG.length-1) ?
                      `<a href="#" style="color: #277BC0; margin-right:15px;" data-id="${i}" class="${proj.id}">#${i+1}</a>`
                      :
                      `<a href="#" style="color: #277BC0;" data-id="${i}" class="${proj.id}">#${i+1}</a>`
                    }).join(' ')
  
                  }
                  </div>
  
                  ${proj.description}</figcaption>
                  </figure>
              </div>
          </div>
      `;
      }

      this._parentEl.insertAdjacentHTML("beforeend", html);

      if (proj.additionalIMG?.length !== 0) {
        document
          .querySelector(`.proj-${proj.id}`)
          .addEventListener("click", (e) => {
            e.stopPropagation();
            if (e.target.classList.contains(`${proj.id}`)) {
              e.preventDefault();
              e.target.closest(".project-card").querySelector("img").src =
                proj.additionalIMG[+e.target.dataset.id];
            }
          });
      }
    });
  }

  lazyImageLoader() {
    const projectImages = document.querySelectorAll("img[data-src]");

    const obsProjImgOptions = {
      root: null,
      threshold: 0,
      rootMargin: "50px",
    };

    const loadImg = function (entries, observer) {
      if (!projectImages) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.src = entry.target.dataset.src;
          entry.target.addEventListener("load", () => {
            entry.target.classList.remove("lazy-image");
          });
        } else return;
        observer.unobserve(entry.target);
      });
    };

    const lazyImageObserver = new IntersectionObserver(
      loadImg,
      obsProjImgOptions
    );
    projectImages.forEach((image) => lazyImageObserver.observe(image));

    if (!"IntersectionObserver" in window && projectImages) {
      projectImages.forEach((image) => {
        image.src = image.dataset.src;
        image.classList.remove("lazy-image");
      });
    }
  }
}

export default new ProjectsView();
