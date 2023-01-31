import PortfolioBaseView from "./portfolioBaseView.js";
import { courses } from "./about.js";

class CoursesView extends PortfolioBaseView {
  _parentElement = document.querySelector(".courses__container");
  _class = "course__row";
  _selector = "course-selector";
  _btnType = "btn__courses";

  coursesHandler() {
    Object.entries(courses).forEach((entry) => {
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

export default new CoursesView();
