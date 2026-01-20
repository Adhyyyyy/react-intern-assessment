
import { useState } from "react"
import { useRecipeStore, type RecipeType } from "@/store/recipes"
import RecipieCard from "./recipe-card"
import RecipeInfo from "./recipe-info"
import { Dialog, DialogTrigger } from "../ui/dialog"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

interface RecipeListProps {
    isArchivedView?: boolean // Optional: if true, show archived. If false/undefined, show active.
}



export default function RecipeList({ isArchivedView = false }: RecipeListProps) {

    const recipes: RecipeType[] = useRecipeStore(state => state.recipes)
    // 1. Local State
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const ITEMS_PER_PAGE = 5
    // 2. Filter Logic (Search + Archive Check)
    const filteredRecipes = recipes.filter(r =>
        r.isArchived === isArchivedView && // <--- This line is key!
        r.title.toLowerCase().includes(search.toLowerCase())
    )
    // 3. Pagination Logic
    const totalPages = Math.ceil(filteredRecipes.length / ITEMS_PER_PAGE)
    const paginatedRecipes = filteredRecipes.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    )


    return (
        <div className="flex flex-col gap-5 w-full max-w-2xl">
            {/* 1. Search Bar */}
            <div className="flex gap-2">
                <Input
                    placeholder="Search recipes..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* 2. The Recipe List */}
            <div className="flex gap-3 flex-col">
                {paginatedRecipes.length === 0 ? (
                    <p className="text-center text-muted-foreground">No recipes found.</p>
                ) : (
                    paginatedRecipes.map(recipe => (
                        <Dialog key={recipe.id}>
                            <DialogTrigger asChild>
                                <div>
                                    <RecipieCard
                                        index={recipe.id}
                                        title={recipe.title}
                                        description={recipe.description}
                                    />
                                </div>
                            </DialogTrigger>
                            <RecipeInfo id={recipe.id} />
                        </Dialog>
                    ))
                )}
            </div>

            {/* 3. Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-between items-center mt-4">
                    <Button
                        variant="outline"
                        disabled={page === 1}
                        onClick={() => setPage(p => p - 1)}
                    >
                        Previous
                    </Button>
                    <span className="text-sm">
                        Page {page} of {totalPages}
                    </span>
                    <Button
                        variant="outline"
                        disabled={page === totalPages}
                        onClick={() => setPage(p => p + 1)}
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    )
}