import { Link } from "react-router-dom"
import { createNewRecipe } from "../services/recipeService"

export default function CreateRecipePage() {



    return (
        <>
            <h1> this where you create a recipe </h1>
            <li><Link to="/recipefeed">View all recipes</Link></li>
            <li><Link to="/">Return to index</Link></li>
        </>

    )
}