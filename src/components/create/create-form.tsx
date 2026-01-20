import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"

import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useRecipeStore } from "@/store/recipes"


import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"

const recipeSchema = z.object({
    title: z.string().min(1, "Recipe name is required"),
    description: z.string().min(1, "Description is required"),
    ingredients: z.array(z.object({
        name: z.string().min(1, "Ingredient name is required"),
        quantity: z.number().min(1, "Quantity must be at least 1"),
        unit: z.enum(["mg", "l", "ml", "nos"]),
    }))
})

type RecipeFormValues = z.infer<typeof recipeSchema>


export default function CreateForm() {
    const addRecipe = useRecipeStore(state => state.addRecipe)
    const navigate = useNavigate()

    const form = useForm<RecipeFormValues>({
        resolver: zodResolver(recipeSchema),
        defaultValues: {
            title: "",
            description: "",
            ingredients: []
        },
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "ingredients",
    })

    const handleSubmit = (values: RecipeFormValues) => {
        const newRecipe = {
            id: Date.now().toString(),
            ...values,
            isArchived: false
        }
        addRecipe(newRecipe)
        alert("Recipe created successfully!")
        navigate("/")
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4 max-w-md"
            >
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Recipe Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter recipe name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Enter description" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <Button
                            type="button" // Important: prevents submitting the form
                            variant="outline"
                            size="sm"
                            onClick={() => append({ name: "", quantity: 1, unit: "nos" })}
                        >
                            <Plus className="w-4 h-4 mr-2" />Add Ingredient
                        </Button>
                    </div>

                    {fields.map((field, index) => (
                        <div key={field.id} className="flex gap-2 items-end">
                            {/* Ingredient Name */}
                            <FormField
                                control={form.control}
                                name={`ingredients.${index}.name`}
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormControl>
                                            <Input placeholder="Ingredient name" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            {/* Quantity (Auto-converts to number) */}
                            <FormField
                                control={form.control}
                                name={`ingredients.${index}.quantity`}
                                render={({ field }) => (
                                    <FormItem className="w-24">
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Qty"
                                                {...field}
                                                onChange={e => field.onChange(Number(e.target.value))}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            {/* Unit Selector (Custom styled to match theme) */}
                            <FormField
                                control={form.control}
                                name={`ingredients.${index}.unit`}
                                render={({ field }) => (
                                    <FormItem className="w-24">
                                        <FormControl>
                                            <select
                                                {...field}
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                <option value="nos">nos</option>
                                                <option value="mg">mg</option>
                                                <option value="ml">ml</option>
                                                <option value="l">l</option>
                                            </select>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            {/* Remove Button */}
                            <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                onClick={() => remove(index)}
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                </div>

                <Button type="submit">Create Recipe</Button>
            </form>
        </Form>
    )
}
