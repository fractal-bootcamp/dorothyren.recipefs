//this is where all the api calls to grab recipes goes

import { z } from "zod";
import { SERVER_URL } from "../constants";
import { makeRequest } from "../utils/makeRequest";

export const RecipeSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  userId: z.string(),
});

export type Recipe = z.infer<typeof RecipeSchema>;

export type RecipeList = Recipe[];

//function to grab all of the recipes
export async function fetchRecipeList(): Promise<RecipeList> {
  try {
    const response = await fetch(SERVER_URL + "/recipefeed");
    // making a GET request to the index page
    // parse the response as json
    const results = await response.json();
    // validate the response using zod
    const parsedResults = z.array(RecipeSchema).parse(results);
    return parsedResults;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation error:", error.errors);
    } else {
      console.error("Fetch error:", error);
    }
    throw new Error("failed to fetch recipe list");
  }
}

console.log(await fetchRecipeList());

//some function to create a new Recipe
export async function createNewRecipe(
  name: string,
  description: string,
  userId: string
): Promise<Recipe> {
  //write funciton that creates a new recipe with the prior inputs
}
