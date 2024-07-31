import { Link } from "react-router-dom";
import { CreateRecipeCard } from "../components/RecipeCard";
import { useEffect, useState } from "react";
import { RecipeList } from "../services/recipeService";
import { makeRequest } from "../utils/makeRequest";
import { useAuth } from "@clerk/clerk-react";


type RecipeFeed = RecipeList | null

const fetchRecipes = async (token: string): Promise<RecipeFeed> => {
    const fetchedRecipes = await makeRequest<RecipeFeed>({
        endpoint: "/recipefeed",
        method: "GET",
        token
    });
    return fetchedRecipes
}

// custom hook called useRecipeData that's responsible for fetching recipe information
// and then it exposes recipe data
const useRecipeData = () => {
    const [recipes, setRecipes] = useState<RecipeFeed>([])
    const { getToken } = useAuth()

    useEffect(() => {
        const fetchData = async () => {
            const token = await getToken();
            console.log(token)

            if (token) {
                const data = await fetchRecipes(token);
                setRecipes(data)
            }
        }
        fetchData()
    }, [])

    return { recipes }
}
export default function RecipeFeedPage() {
    const { recipes } = useRecipeData()

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-3xl text-center my-8"> this is the recipe feed </h1>
            <div className="flex flex-wrap justify-center gap-8">
                {recipes && recipes.map((recipe) => (
                    <CreateRecipeCard
                        key={recipe.id}
                        name={recipe.name}
                        description={recipe.description}
                    />
                ))}
            </div>
            <div className="mt-8">
                <li className="hover:underline"><Link to="/createrecipe">Create a recipe</Link></li>
                <li className="hover:underline"><Link to="/">Return to index</Link></li>
            </div>
        </div>
    )
}
