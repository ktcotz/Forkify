import { Recipe } from "../schemas/RecipeSchema";
import { View } from "./View";

class RecipeView extends View {
  private parentElement = document.querySelector(".recipe");
  private recipe: Recipe | null = null;

  constructor() {
    super();
    this.renderSpinner.call(this, this.parentElement);
  }

  render(recipe: Recipe) {
    this.recipe = recipe;

    this.clearElementContent(this.parentElement);

    this.parentElement?.insertAdjacentHTML("afterbegin", this.generateMarkup());
  }

  private generateMarkup() {
    if (!this.recipe) return "";

    const recipeContent = /* HTML */ `
      <figure class="recipe__fig">
        <img
          src="${this.recipe.image_url}"
          alt="${this.recipe.title}"
          class="recipe__img"
        />
        <h1 class="recipe__title">
          <span>${this.recipe.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="img/icons.svg#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes"
            >${this.recipe.cooking_time}</span
          >
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="img/icons.svg#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people"
            >${this.recipe.servings}</span
          >
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="img/icons.svg#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="img/icons.svg#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated">
          <svg>
            <use href="img/icons.svg#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round">
          <svg class="">
            <use href="img/icons.svg#icon-bookmark-fill"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
          ${this.recipe.ingredients
            .map((ingredient) => {
              return /* HTML */ `
                <li class="recipe__ingredient">
                  <svg class="recipe__icon">
                    <use href="img/icons.svg#icon-check"></use>
                  </svg>
                  <div class="recipe__quantity">${ingredient.quantity}</div>
                  <div class="recipe__description">
                    <span class="recipe__unit">${ingredient.unit}</span>
                    ${ingredient.description}
                  </div>
                </li>
              `;
            })
            .join("")}
        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${this.recipe.publisher}</span>.
          Please check out directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${this.recipe.source_url}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="img/icons.svg#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    `;

    return recipeContent;
  }
}

export default new RecipeView();
