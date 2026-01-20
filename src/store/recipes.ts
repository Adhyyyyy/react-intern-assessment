import { dummyData } from '@/data';
import { create } from 'zustand'

export type IngredientType = {
    name: string;
    unit: "mg" | "l" | "ml" | "nos"
    quantity: number
}

export type RecipeType = {
    id: string
    title: string
    description: string
    ingredients: IngredientType[]
    isArchived: boolean // <--- Added this
}

interface RecipeState {
    recipes: RecipeType[]

    addRecipe: (recipe: RecipeType) => void;
    findRecipe: (id: string) => RecipeType | undefined;
    deleteRecipe: (id: string) => void;
    archiveRecipe: (id: string) => void;
    unarchiveRecipe: (id: string) => void;
}

export const useRecipeStore = create<RecipeState>()((set, get) => {
    return {
        recipes: dummyData,

        addRecipe: (recipe: RecipeType) => {
            const currentRecpie: RecipeType[] = get().recipes
            set(
                {
                    recipes: [...currentRecpie, recipe]
                }
            )
        },

        findRecipe: (id: string) => {
            let recipe = undefined
            const recipes = get().recipes
            recipe = recipes.find((recipe) => recipe.id === id)
            return recipe
        },

        deleteRecipe: (id: string) => {
            set((state) => ({
                recipes: state.recipes.filter((recipe) => recipe.id !== id)
            }))
        },

        archiveRecipe: (id: string) => {
            set((state) => ({
                recipes: state.recipes.map((recipe) =>
                    recipe.id === id ? { ...recipe, isArchived: true } : recipe
                )
            }))
        },

        unarchiveRecipe: (id: string) => {
            set((state) => ({
                recipes: state.recipes.map((recipe) =>
                    recipe.id === id ? { ...recipe, isArchived: false } : recipe
                )
            }))
        },
    }
})