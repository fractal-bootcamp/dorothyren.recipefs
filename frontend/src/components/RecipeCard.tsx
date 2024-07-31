
type RecipeProps = {
    name: string,
    description: string,
}
export function CreateRecipeCard(recipe: RecipeProps) {
    return (
        <>
            <div className="border border-orange-100 bg-amber-50 rounded p-4 hover:bg-lime-200" style={{ width: '33.33%' }}>
                <h2>{recipe.name}</h2>
                <h3>{recipe.description}</h3>
            </div>
        </>
    )
}