import { useParams } from "react-router-dom";
import RecipeCardResult from "../components/RecipeCardResult"
import { useEffect, useState } from "react";
import { Category } from "../types/type";
import axios from "axios";

const CategoryLatestRecipesWrapper = () => {

    const { slug } = useParams<{ slug: string }>();
    const [category, setCategory] = useState<Category | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/category/${slug}`)
            .then((response) => {
                setCategory(response.data.data)
                setLoading(false)
            })
            .catch(error => {
                setError(error)
                setLoading(false)
            });
    }, [slug])

    if (loading) {
        return <p className="px-5">Loading...</p>
    }

    if (error) {
        console.log(error)
        return <p className="px-5">Error fetching data</p>
    }

    if (!category) {
        return <p className="px-5">Category not found</p>
    }


    return (
        <section id="LatestRecipes" className="px-5 mt-[30px]">
            <div className="flex items-center justify-between">
                <h2 className="font-bold">Latest Recipes</h2>
            </div>
            <div className="flex flex-col gap-[18px] mt-[18px]">
                {category.recipes.length > 0 ? (
                    category.recipes.map((recipe) => (
                        <RecipeCardResult key={recipe.id} recipe={recipe} />
                    ))) : (<p className="px-5">Belum ada data terkait</p>)}
            </div>
        </section>
    )
}

export default CategoryLatestRecipesWrapper