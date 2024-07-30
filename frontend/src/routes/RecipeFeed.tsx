import { Link } from "react-router-dom";

export default function RecipeFeedPage() {
    return (
        <>
            <h1> this is the recipe feed </h1>
            <li><Link to="/createrecipe">Create a recipe</Link></li>
            <li><Link to="/">Return to index</Link></li>
        </>
    )
}