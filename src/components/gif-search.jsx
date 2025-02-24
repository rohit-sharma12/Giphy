import { useState } from "react"
import { HiMiniXMark, HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const GifSearch = () => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const searchGIFs = () => {
        if (query.trim() === "") {
            return;
        }

        navigate(`/search/${query}`);
    }
    return (
        <div className="flex relative">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search all the Gifs and Stickers"
                className="w-full pl-4 pr-14 py-5 bg-white text-black rounded-tl rounded-bl border border-gray-300 outline-none"
            />
            {query && (
                <button onClick={() => setQuery("")} className="absolute bg-gray-400 opacity-90 rounded-full right-20 mr-2 top-4">
                    <HiMiniXMark size={32} />
                </button>
            )}

            <button onClick={searchGIFs} className="bg-gradient-to-tr from-pink-600 to-pink-400 text-white px-4 py-2 rounded-tr rounded-br">
                <HiOutlineMagnifyingGlass size={35} className="-scale-x-100" />
            </button>
        </div>
    )
}

export default GifSearch
