import RecipeList from "@/components/recpies/recipe-list";

export default function Archive() {
    return (
        <div className="flex flex-col items-center m-5 gap-5">
            <h1 className="text-2xl font-bold">Archived Recipes</h1>
            <RecipeList isArchivedView={true} />
        </div>
    )
}