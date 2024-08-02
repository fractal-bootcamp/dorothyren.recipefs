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

/**function that hits the /createrecipe/:id endpoint */
export async function createNewRecipe(
  name: string,
  description: string,
  token: string
): Promise<Recipe> {
  const newRecipe = await makeRequest<Recipe>({
    endpoint: "/createrecipe",
    method: "POST",
    body: {
      name: name,
      description: description,
      // image: image,
    },
    token,
  });
  if (!newRecipe) {
    throw new Error("Failed to create new recipe");
  }
  console.log("new recipe is: ", newRecipe);
  return newRecipe;
}
