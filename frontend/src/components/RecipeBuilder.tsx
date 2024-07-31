//this is the interface where a user can create a recipe
import { useAuth } from "@clerk/clerk-react";
import { createNewRecipe } from "../services/recipeService"
import { useState } from "react";

export function RecipeBuilder() {
    const { getToken } = useAuth()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const handleRecipeSave = async (name: string, description: string) => {
        const token = await getToken();
        if (!token) {
            console.error("no token found");
            return;
        }
        try {
            const newRecipe = await createNewRecipe(name, description, token)
            console.log("new recipe saved as: ", newRecipe)
        }
        catch (error) {
            console.error("error saving new recipe", error)
        }
    }

    return (
        <>
            <div className="border p-4 mx-auto" style={{ maxWidth: '600px' }}>
                <div className="mb-4">
                    <label className="block mb-2">Name</label>
                    <input type="text" placeholder="enter the name of your recipe" className="w-full p-2 border rounded" value={name} onChange={(e) => setName(e.target.value)}></input>
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Description</label>
                    <input type="text" placeholder="enter the description of your recipe" className="w-full p-2 border rounded" value={description} onChange={(e) => setDescription(e.target.value)}></input>
                </div>
                <div className="flex justify-center">
                    <button className="border border-gray-400 p-1 rounded-md bg-gray-200" onClick={() => handleRecipeSave(name, description)}>Save New Recipe</button>
                </div>
            </div>
        </>
    )
}