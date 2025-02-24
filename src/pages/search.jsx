import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { GifState } from "../context/context";
import Filter from "../components/filter";
import Gif from "../components/gif";

const Search = () => {
    const [searchResults, setSearchResults] = useState([]);
    const { query } = useParams();

    const { gf, filter } = GifState();

    const fetchSearchResults = async () => {
        const { data } = await gf.search(query, {
            sort: "relevant",
            lang: "en",
            type: filter,
            limit: 20,
        });
        setSearchResults(data);
    };

    useEffect(() => {
        fetchSearchResults()
    }, [filter])

    return (
        <div className="my-4">
            <h2 className="text-5xl pb-3 font-extrabold">{query}</h2>
            <Filter alignLeft={true} />

            {searchResults.length > 0 ? (
                <div className="columns-2 mdd:columns-3 lg:columns-4 gap-2">
                    {searchResults.map((gif) => (
                        <Gif gif={gif} key={gif.id} />
                    ))}
                </div>
            ) : (
                <span>
                    {""}
                    No GIFs found for {query}. Try searching for stickers instead?
                </span>
            )}
        </div>
    )
}

export default Search
