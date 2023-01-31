export default class PortfolioBaseView {
  _generateMarkup(data, courstaken) {
    let arr = [];
    let idx = 0;
    for (let i = 0; i < Math.ceil(data.length / 2); i++) {
      let markup;
      if (i === 0) {
        markup = `
            <div class="row ${this._class} ${courstaken} ">
              <div class="col">
                <p>${data[i]}</p>
              </div>
              <div class="col">
                <p>${data[i + 1] ? data[i + 1] : ""}</p>
              </div>
            </div>
          `;
      } else {
        markup = `
              <div class="row ${this._class} ${courstaken} ">
                <div class="col">
                  <p>${data[idx] ? data[idx] : ""}</p>
                </div>
                <div class="col">
                  <p>${data[idx + 1] ? data[idx + 1] : ""}</p>
                </div>
              </div>
            `;
      }
      arr.push(markup);
      idx += 2;
    }

    return arr.join(" ");
  }

  _renderPortfolio(key, values) {
    if (!this._parentElement) return;
    if (!values || !key) return;

    const markup = this._generateMarkup(values, key);
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  eventHandler() {
    if (!document.querySelector(`.${this._btnType}`)) return;

    document
      .querySelector(`.${this._btnType}`)
      .addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        const posY = window.pageYOffset;
        const all = document.querySelectorAll(`.${this._class}`);

        if (!e.target.classList.contains(`${this._selector}`)) return;

        // Unhide all
        all.forEach((row) => {
          row.classList.remove("hidden");
        });

        // Remove selection
        document
          .querySelectorAll(`.${this._selector}`)
          .forEach((el) => el.classList.remove("active"));

        // Hide and unhide logic
        if (e.target.id === "all") {
          all.forEach((row) => row.classList.remove("hidden"));
        } else {
          e.target.classList.add("active");
          const buttons = document.querySelectorAll(`.${this._selector}`);

          buttons.forEach((button) => {
            if (e.target.id !== button.id) {
              this._parentElement
                .querySelectorAll(`.${button.id}`)
                .forEach((row) => row.classList.add("hidden"));

              button.classList.remove("active");
            }
          });
        }

        // Maintain the same scroll position after rendering
        window.scrollTo({
          top: posY,
          behavior: "smooth",
        });
      });
  }
}
