import z from "zod";

const IngredientSchema = z.object({
  quantity: z.number().nullable(),
  unit: z.string(),
  description: z.string(),
});

export const RecipeSchema = z.object({
  id: z.string(),
  cooking_time: z.number(),
  image_url: z.string(),
  ingredients: z.array(IngredientSchema),
  publisher: z.string(),
  servings: z.number(),
  source_url: z.string(),
  title: z.string(),
});

export type Recipe = z.infer<typeof RecipeSchema>;
