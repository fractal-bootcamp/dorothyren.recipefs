import { Link } from "react-router-dom";
import { CreateRecipeCard } from "../components/RecipeCard";
import { useEffect, useState } from "react";
import { SERVER_URL } from "../constants";
import { RecipeList } from "../services/recipeService";
import { makeRequest, useRequest } from "../utils/makeRequest";


type RecipeFeed = RecipeList | null

const fetchRecipes = async (client: typeof makeRequest): Promise<RecipeFeed> => {
    const fetchedRecipes = await client<RecipeFeed>({
        endpoint: "/recipefeed",
        method: "GET"
    });
    console.log(fetchedRecipes)
    return fetchedRecipes
}


// const fetchRecipes2 = async (): Promise<RecipeFeed> => {
//     try {
//         const response = await fetch(SERVER_URL + "/recipefeed")
//         const fetchedRecipes = await response.json()
//         console.log(fetchedRecipes)
//         return fetchedRecipes
//     }
//     catch (error) {
//         console.error('Error fetching art pieces:', error);
//         throw error
//     }
// }

export default function RecipeFeedPage() {
    const [recipes, setRecipes] = useState<RecipeFeed>([])
    const { makeRequest } = useRequest()

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchRecipes(makeRequest);
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
            {recipes && recipes.map((recipe) => (
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
