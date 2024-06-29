import z from "zod";
import { QueryRecipeSchema, RecipeSchema } from "./RecipeSchema";

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

const QuerySuccessRecipeSchema = z.object({
  status: z.literal("success"),
  results: z.number(),
  data: z.object({
    recipes: z.array(QueryRecipeSchema),
  }),
});

export const LoadQueryRecipeSchema = QuerySuccessRecipeSchema;

export const LoadRecipeSchema = z.union([
  SuccessRecipeSchema,
  ErrorRecipeSchema,
]);
