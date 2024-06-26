import { LoadRecipeSchema } from "./schemas/LoadRecipeSchema";
import { Recipe } from "./schemas/RecipeSchema";
import { API_URL } from "./services/config";

const recipeContainer = document.querySelector(".recipe");

const clearElementContent = <T extends Element>(parentElement: T | null) => {
  if (!parentElement) return;

  parentElement.innerHTML = "";
};

const renderSpinner = <T extends Element>(parentElement: T | null) => {
  if (!parentElement) return;

  const spinnerContent = /* HTML */ `
    <div class="spinner">
      <svg>
        <use href="img/icons.svg#icon-loader"></use>
      </svg>
    </div>
  `;

  clearElementContent(parentElement);
  parentElement.insertAdjacentHTML("afterbegin", spinnerContent);
};

const fetchRecipe = async (id: string) => {
  try {
    renderSpinner(recipeContainer);

    const res = await fetch(`${API_URL}/recipes/${id}`);
    const data = await res.json();

    const parsedData = LoadRecipeSchema.parse(data);

    if (parsedData.status === "fail" && !res.ok) {
      throw new Error(`Error : (${res.status}) - ${data.message}`);
    }

    if (parsedData.status === "success") {
      renderRecipe(parsedData.data.recipe);
      return parsedData.data.recipe;
    }
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
};

const renderRecipe = (recipe: Recipe) => {
  const recipeContent = /* HTML */ `
    <figure class="recipe__fig">
      <img
        src="${recipe.image_url}"
        alt="${recipe.title}"
        class="recipe__img"
      />
      <h1 class="recipe__title">
        <span>${recipe.title}</span>
      </h1>
    </figure>

    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="img/icons.svg#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes"
          >${recipe.cooking_time}</span
        >
        <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="img/icons.svg#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people"
          >${recipe.servings}</span
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
        ${recipe.ingredients
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
        <span class="recipe__publisher">${recipe.publisher}</span>. Please check
        out directions at their website.
      </p>
      <a
        class="btn--small recipe__btn"
        href="${recipe.source_url}"
        target="_blank"
      >
        <span>Directions</span>
        <svg class="search__icon">
          <use href="img/icons.svg#icon-arrow-right"></use>
        </svg>
      </a>
    </div>
  `;

  recipeContainer?.insertAdjacentHTML("afterbegin", recipeContent);
};

fetchRecipe("5ed6604591c37cdc054bc886");
