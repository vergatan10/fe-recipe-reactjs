import { Swiper, SwiperSlide } from "swiper/react"
import FeaturedRecipeCard from "../components/FeaturedRecipeCard"
import { Category } from "../types/type"
import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"

const CategoryFeaturedRecipesWrapper = () => {

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
        <section id="MadeByPeople">
            <div className="flex items-center justify-between px-5">
                <h2 className="font-bold">Made by People</h2>
                <a
                    href="#"
                    className="font-semibold text-sm leading-[21px] text-[#FF4C1C]"
                >
                    Explore All
                </a>
            </div>
            <div className="swiper w-full mt-3">
                <Swiper
                    className="w-full mt-3"
                    direction="horizontal"
                    spaceBetween={16}
                    slidesPerView="auto"
                    slidesOffsetBefore={20}
                    slidesOffsetAfter={20}
                >
                    {category.recipes.length > 0 ? (
                        category.recipes.map((recipe) => (
                            <SwiperSlide key={recipe.id} className="!w-fit">
                                <FeaturedRecipeCard recipe={recipe} />
                            </SwiperSlide>
                        ))
                    ) : (<p className="px-5">Belum ada recipe di category berikut</p>)
                    }
                </Swiper>
            </div>
        </section>
    )
}

export default CategoryFeaturedRecipesWrapper