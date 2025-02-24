import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { GifState } from "../context/context";
import Gif from "../components/gif";

const contentType = ["gifs", "stickers", "texts"];

const GifPage = () => {
    const [gif, setGif] = useState();
    const { type, slug } = useParams();
    const [relatedGifs, setRelatedGifs] = useState([]);
    const { gf } = GifState();

    const fetchGif = async () => {
        const gifId = slug.split("-");
        const { data } = await gf.gif(gifId[gifId.length - 1]);
        const { data: related } = await gf.related(gifId[gifId.length - 1], {
            limit: 10,
        });

        setGif(data);
        setRelatedGifs(related);
    }
    useEffect(() => {
        if (!contentType.includes(type)) {
            throw new Error("Invalid Content Type");
        }
    }, [])

    return (
        <div className="grid grid-cols-4 my-10 gap-4">
            <div className="hidden sm:block">
                sidebar
            </div>

            <div className="col-span-4 sm:col-span-3">
                <div className="flex gap-6">
                    <div className="w-full sm:w-3/4">
                        <div className="faded-text truncate mb-2">{gif.title}</div>
                        <Gif gif={gif} hover={false} />
                    </div>
                </div>
                favorites / share / embed
            </div>
            Gif Page
        </div>
    )
}

export default GifPage
