import { type IngredientType, type RecipeType, useRecipeStore } from "@/store/recipes"
import { Trash, Archive } from "lucide-react"
import { Button } from "../ui/button"
import { useEffect, useState, type JSX } from "react"
import { DialogContent, DialogDescription, DialogTitle } from "../ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

interface RecipeInfoProps {
    id: string
}

interface IngredientListProps {
    ingredients: IngredientType[] | undefined
}


function IngredientList({ ingredients }: IngredientListProps): JSX.Element {

    return <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Ingredient</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Unit</TableHead>
            </TableRow>
        </TableHeader>

        <TableBody>
            {ingredients ? ingredients.map(ingredient => (
                <TableRow key={ingredient.name}>
                    <TableCell>{ingredient.name}</TableCell>
                    <TableCell>{ingredient.quantity}</TableCell>
                    <TableCell>{ingredient.unit}</TableCell>
                </TableRow>
            )) : null}
        </TableBody>
    </Table>


}

export default function RecipeInfo({ id }: RecipeInfoProps) {
    const deleteRecipe = useRecipeStore(state => state.deleteRecipe)
    const archiveRecipe = useRecipeStore(state => state.archiveRecipe)

    const [recipe, setRecipe] = useState<RecipeType | undefined>(undefined)

    const findRecpie = useRecipeStore(state => state.findRecipe)

    useEffect(() => {
        const fetchRecipe = () => {
            const recipe = findRecpie(id)
            setRecipe(recipe)
        }

        fetchRecipe()
    }, [id])

    return <DialogContent>
        <DialogTitle>
            {recipe?.title}
        </DialogTitle>
        <DialogDescription>
            {recipe?.description}
        </DialogDescription>
        <IngredientList ingredients={recipe?.ingredients} />
        <div className="flex justify-end gap-2 mt-4">
            <Button
                variant="outline"
                onClick={() => {
                    archiveRecipe(id)
                    // The dialog will close automatically because the item disappears from the filtered list in parent
                }}
            >
                <Archive className="w-4 h-4 mr-2" />
                Archive
            </Button>

            <Button
                variant="destructive"
                onClick={() => {
                    deleteRecipe(id)
                }}
            >
                <Trash className="w-4 h-4 mr-2" />
                Delete
            </Button>
        </div>
    </DialogContent>

}