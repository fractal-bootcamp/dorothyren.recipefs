import { Link } from "react-router-dom";

export default function IndexPage() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">This is the index page</h1>
            <div>
                <ul className="list-disc pl-5">
                    <li className="mb-2"><Link to="/recipefeed" className="text-blue-500 hover:underline">View all recipes</Link></li>
                    <li><Link to="/createrecipe" className="text-blue-500 hover:underline">Create New Recipe</Link></li>
                    <li><Link to="/sign-in" className="text-blue-500 hover:underline">Sign In</Link></li>
                    <li><Link to="/sign-up" className="text-blue-500 hover:underline">Sign Up</Link></li>
                </ul>
            </div>
        </div>
    )
}