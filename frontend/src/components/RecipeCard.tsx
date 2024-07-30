
type RecipeProps = {
    name: string,
    description: string,
}

export function CreateRecipeCard(recipe: RecipeProps) {
    return (
        <>
            <div className="border bg-gray-200">
                <h2>{recipe.name}</h2>
                <h3>{recipe.description}</h3>
            </div>
        </>
    )
}