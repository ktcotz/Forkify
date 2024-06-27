import { LoadRecipeSchema } from "../schemas/LoadRecipeSchema";
import { Recipe } from "../schemas/RecipeSchema";
import { API_URL } from "../services/config";

class State {
  recipe: Recipe | null = null;

  async loadRecipe(id: string) {
    try {
      const res = await fetch(`${API_URL}/recipes/${id}`);
      const data = await res.json();
      const parsedData = LoadRecipeSchema.parse(data);

      if (parsedData.status === "fail" && !res.ok) {
        throw new Error(`Error : (${res.status}) - ${data.message}`);
      }

      if (parsedData.status === "success") {
        this.recipe = parsedData.data.recipe;
      }
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }
    }
  }
}

export default new State();
