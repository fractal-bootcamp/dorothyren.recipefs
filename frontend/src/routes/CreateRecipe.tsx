import { Link } from "react-router-dom"
import { RecipeBuilder } from "../components/RecipeBuilder"

export default function CreateRecipePage() {

    return (
        <>
            <h1> create your recipe here</h1>
            <RecipeBuilder />
            <li><Link to="/recipefeed">View all recipes</Link></li>
            <li><Link to="/">Return to index</Link></li>
        </>

    )
}