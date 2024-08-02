//this is the interface where a user can create a recipe
import { useAuth } from "@clerk/clerk-react";
import { createNewRecipe } from "../services/recipeService"
import { useState } from "react";
import { ChangeEvent } from "react";
import axios from "axios";
import { SERVER_URL } from "../constants";

const uploadFile = (imageFile: File, recipeID: string, token: string) => {
    if (!imageFile) return;
    const formData = new FormData();
    console.log(imageFile)
    formData.append('image', imageFile);
    formData.append('recipeId', recipeID);

    axios.post(`${SERVER_URL}/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            console.log('File uploaded successfully', response.data);
        })
        .catch(error => {
            console.error('Error uploading file', error);
        });
}

export function RecipeBuilder() {
    const { getToken } = useAuth()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [imageFile, setImageFile] = useState<File | null>(null)

    const onFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setImageFile(event.target.files[0]);
        }
    }

    const handleRecipeSave = async (name: string, description: string) => {
        const token = await getToken();
        if (!token) {
            console.error("no token found");
            return;
        }
        try {
            // Create a new recipe with the provided name and description, hits /createrecipe endpoint
            const newRecipe = await createNewRecipe(name, description, token)
            console.log("new recipe saved as: ", newRecipe.id)
            // If an image file is selected, upload it via sending a POST request, hits /upload endpoint
            if (imageFile) {
                console.log("attempting to upload file: ", imageFile.name, imageFile.size)
                const uploadedFile = uploadFile(imageFile, newRecipe.id, token)
                console.log(uploadedFile)
            }
        }
        catch (error) {
            console.error("error saving new recipe", error)
        }
    }

    return (
        <>
            <div className="border p-4 mx-auto" style={{ maxWidth: '600px' }}>
                <div className="mb-4">
                    <label className="block mb-2">Recipe Image</label>
                    <input type="file" placeholder="upload image of recipe" className="w-full p-2 border rounded" onChange={onFileChange}></input>
                </div>
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
            </div >
        </>
    )
}