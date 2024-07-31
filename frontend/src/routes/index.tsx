import { Link } from "react-router-dom";

export default function IndexPage() {
    return (
        <div>
            <h1>This is the index page</h1>
            <div>
                <ul>
                    <li><Link to="/recipefeed">View all recipes</Link></li>
                    <li><Link to="/createrecipe">Create New Recipe</Link></li>
                </ul>
            </div>
        </div>
    )
}