import { LoadRecipeSchema } from "./schemas/LoadRecipeSchema";
import { API_URL } from "./services/config";

const recipeContainer = document.querySelector(".recipe");

const fetchRecipe = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}/recipes/${id}`);
    const data = await res.json();

    const parsedData = LoadRecipeSchema.parse(data);

    if (parsedData.status === "fail" && !res.ok) {
      throw new Error(`Error : (${res.status}) - ${data.message}`);
    }

    if (parsedData.status === "success") {
      return parsedData.data.recipe;
    }
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
};

fetchRecipe("5ed6604591c37cdc054bc886");
