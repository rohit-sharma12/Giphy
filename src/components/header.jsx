import { Children, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { GifState } from "../context/context";
import GifSearch from "./gif-search";


const Header = () => {
    const [categories, setCategories] = useState([]);
    const [showCategories, setShowCategories] = useState(false);

    const { gf, favorites } = GifState();

    const fetchGifCategories = async () => {
        const { data } = await gf.categories();
        setCategories(data);
    };

    useEffect(() => {
        fetchGifCategories();
    }, []);

    return (
        <nav>
            <div className="relative flex items-center gap-4 justify-between mb-2">
                <Link to="/">
                    <img src="/public/logo.svg" alt="logo" />
                </Link>
                <div className="font-bold text-md flex gap-3 items-center">
                    {categories?.slice(0, 5)?.map((category) => {
                        return (
                            <Link key={category.name} to={`/${category.name_encoded}`} className="px-8 mr-10 py-1 hover:gradient border-b-4 lg:block hidden">{category.name}</Link>
                        );
                    })}

                    <button onClick={() => setShowCategories(!showCategories)}>
                        <BsThreeDotsVertical size={35} className={`py-0.5 hover:gradient ${showCategories ? "gradient" : ""} border-b-4 hidden lg:block`} />
                    </button>
                    {favorites.length > 0 && (
                        <div className="h-9 bg-gray-700 pt-1.5 px-6 cursor-pointer rounded">
                            <Link to="/favorites">Favorite GIFs</Link>
                        </div>
                    )}

                    <button>
                        <HiMiniBars3BottomRight className="text-sky-400 block lg:hidden" size={30} />
                    </button>
                </div>
                {showCategories && (
                    <div className="absolute rigght-0 top-12 px-10 pt-6 pb-9 w-full gradient z-20">
                        <span className="text-3xl font-extrabold">Categories</span>
                        <hr className="bg-gary-100 opacity-50 my-5" />
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                            {categories?.map((category) => {
                                return (
                                    <Link className="font-bold hover:underline" key={category.name} to={`/${category.name_encoded}`}>
                                        {category.name}
                                    </Link>
                                );
                            })}

                        </div>
                    </div>
                )}
            </div>
            <GifSearch />
        </nav>
    )
}

export default Header
