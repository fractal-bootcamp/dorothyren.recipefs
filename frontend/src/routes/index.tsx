import { Link } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

export default function IndexPage() {
    const { userId } = useAuth();
    return (
        <div className="container mx-auto p-4 flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4">This is the index page</h1>
            <div>
                <ul className=" pl-5">
                    <div>
                        <Link to="/recipefeed" className="text-blue-500 hover:underline">View all recipes</Link>
                    </div>

                    <div>
                        <Link to="/createrecipe" className="text-blue-500 hover:underline">Create New Recipe</Link>
                    </div>
                    {!userId && (
                        <>
                            <Link to="/sign-in" className="text-blue-500 hover:underline">Sign In</Link>
                            <Link to="/sign-up" className="text-blue-500 hover:underline">Sign Up</Link>
                        </>
                    )}
                </ul>
            </div>
        </div>
    )
}