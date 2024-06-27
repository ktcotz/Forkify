import state from "./state/state";
import RecipeView from "./views/RecipeView";

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
      console.log(err.message);
    }
  }
};

["load", "hashchange"].forEach((ev) =>
  window.addEventListener(ev, (event) => {
    controlRecipes();
  })
);
