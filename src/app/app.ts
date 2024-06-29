import state from "./state/state";
import RecipeView from "./views/RecipeView";
import ResultsView from "./views/ResultsView";
import SearchView from "./views/SearchView";

const controlRecipes = async () => {
  try {
    RecipeView.renderSpinner();

    const id = window.location.hash.slice(1);

    if (!id) {
      throw new Error("ID is required!");
    }

    await state.loadRecipe(id);

    const { recipe } = state;

    if (!recipe) {
      throw new Error("Invalid recipe!");
    }

    RecipeView.render(recipe);
  } catch (err) {
    if (err instanceof Error) {
      RecipeView.renderError(RecipeView.parentElement, RecipeView.errorMessage);
    }
  }
};

const controlSearchResults = async () => {
  try {
    ResultsView.renderSpinner();

    const query = SearchView.getQuery();

    if (!query) return;

    await state.loadSearchResults(query);

    ResultsView.render(state.search.results);
  } catch (err) {
    if (err instanceof Error) {
      ResultsView.renderError(
        ResultsView.parentElement,
        ResultsView.errorMessage
      );
    }
  }
};

const init = () => {
  RecipeView.addHandlerRender(controlRecipes);
  SearchView.addHandlerSearch(controlSearchResults);
};

init();
