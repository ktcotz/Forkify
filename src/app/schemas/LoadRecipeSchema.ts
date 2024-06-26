import z from "zod";
import { RecipeSchema } from "./RecipeSchema";

const SuccessRecipeSchema = z.object({
  status: z.literal("success"),
  data: z.object({
    recipe: RecipeSchema,
  }),
});

const ErrorRecipeSchema = z.object({
  status: z.literal("fail"),
  message: z.string(),
});

export const LoadRecipeSchema = z.union([
  SuccessRecipeSchema,
  ErrorRecipeSchema,
]);
