import {
  LoadQueryRecipeSchema,
  LoadRecipeSchema,
} from "../schemas/LoadRecipeSchema";
import { QueryRecipe, Recipe } from "../schemas/RecipeSchema";
import { API_URL } from "../services/config";

class State {
  recipe: Recipe | null = null;
  search: { query: string; results: QueryRecipe[] } = {
    query: "",
    results: [],
  };

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

  async loadSearchResults(query: string) {
    try {
      const res = await fetch(
        `${API_URL}/recipes?search=${query || this.search.query}`
      );

      const data = await res.json();
      const parsedData = LoadQueryRecipeSchema.parse(data);

      if (parsedData.status === "success") {
        this.search.query = query;
        this.search.results = parsedData.data.recipes;
      }
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }
    }
  }
}

export default new State();
