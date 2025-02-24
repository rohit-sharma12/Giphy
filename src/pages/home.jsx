import { useEffect } from "react";
import { GifState } from "../context/context";
import Gif from "../components/gif";
import Filter from "../components/filter";

const Home = () => {
    const { gf, gifs, setGifs, filter } = GifState();

    const fetchTrendingGIFs = async () => {
        const { data } = await gf.trending({
            limit: 20,
            type: filter,
            rating: "g",
        });

        setGifs(data);
    }

    useEffect(() => {
        fetchTrendingGIFs()
    }, [filter]);

    return (
        <div>
            <Filter showTrending />
            <div className="columns-2 md:columns-3 lg:columns-4 xl:colimns-5 gap-2">
                {gifs.map((gif) => {
                    return <Gif gif={gif} key={gif.title} />
                })}
            </div>
        </div>
    )
}

export default Home
