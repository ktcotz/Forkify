import { QueryRecipe } from "../schemas/RecipeSchema";
import { View } from "./View";

class ResultsView extends View {
  parentElement = document.querySelector(".results");
  private results: QueryRecipe[] = [];
  errorMessage = "No recipes found for your query. Please try again :)";
  constructor() {
    super();
    this.renderSpinner.call(this, this.parentElement);
  }

  render(results: QueryRecipe[]) {
    this.results = results;

    this.clearElementContent(this.parentElement);

    if (this.results.length === 0) {
      return this.renderError(this.parentElement, this.errorMessage);
    }

    this.parentElement?.insertAdjacentHTML("afterbegin", this.generateMarkup());
  }

  private generateMarkup() {
    return this.results
      .map((result) => this.generateMarkupPreview(result))
      .join("");
  }

  private generateMarkupPreview(result: QueryRecipe) {
    const resultsContent = /* HTML */ `
      <li class="preview">
        <a class="preview__link preview__link--active" href="#${result.id}">
          <figure class="preview__fig">
            <img src="${result.image_url}" alt="${result.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${result.title}</h4>
            <p class="preview__publisher">${result.publisher}</p>
            <div class="preview__user-generated">
              <svg>
                <use href="img/icons.svg#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>
    `;

    return resultsContent;
  }
}

export default new ResultsView();
