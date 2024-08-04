import { Link } from "react-router-dom";
import { CreateRecipeCard } from "../components/RecipeCard";
import { useEffect, useState } from "react";
import { SERVER_URL } from "../constants";
import { RecipeList } from "../services/recipeService";


type RecipeFeed = RecipeList

const fetchRecipes = async (): Promise<RecipeFeed> => {
    try {
        const response = await fetch(SERVER_URL + "/recipefeed")
        const fetchedRecipes = await response.json()
        console.log(fetchedRecipes)
        return fetchedRecipes
    }
    catch (error) {
        console.error('Error fetching art pieces:', error);
        throw error
    }
}

export default function RecipeFeedPage() {
    const [recipes, setRecipes] = useState<RecipeFeed>([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchRecipes();
            setRecipes(data)
        }
        fetchData()
    }, [])

    // useEffect(() => {
    //     // Simulating fetch
    //     setRecipes([{
    //         id: '1',
    //         name: 'Test Recipe',
    //         description: 'Test Description',
    //         createdAt: '2023-01-01T00:00:00Z',
    //         updatedAt: '2023-01-01T00:00:00Z',
    //         userId: 'user123'
    //     }]);
    // }, []);

    console.log("recipes: ", recipes)


    return (
        <>
            <h1> this is the recipe feed </h1>
            {recipes.map((recipe) => (
                <CreateRecipeCard
                    key={recipe.id}
                    name={recipe.name}
                    description={recipe.description}
                />
            ))}
            <li><Link to="/createrecipe">Create a recipe</Link></li>
            <li><Link to="/">Return to index</Link></li>
        </>
    )
}
