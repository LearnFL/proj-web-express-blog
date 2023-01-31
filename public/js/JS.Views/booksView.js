import PortfolioBaseView from "./portfolioBaseView.js";
import { books } from "./about.js";

class BooksView extends PortfolioBaseView {
  _parentElement = document.querySelector(".books__container");
  _class = "book__row";
  _selector = "book-selector";
  _btnType = "btn__books";

  coursesHandler() {
    Object.entries(books).forEach((entry) => {
      const [key, values] = entry;
      this._renderPortfolio(key, values);
    });
    this._addShading();
  }

  _addShading() {
    document.querySelectorAll(`.${this._class}`).forEach((row, i) => {
      console.log(row);
      i % 2 === 0 ? row.classList.add("shaded-grid") : "";
    });
  }
}

export default new BooksView();
