import { Link, useParams } from "react-router";
import useFetch from "../../hooks/useFetch";
import { singleGenre } from "../../services/genres";
import MediaCard from "../MediaCard/MediaCard";
import './GenreShow.css'

export default function GenreShow() {

    const { genreId } = useParams()
    const { data: genre, isLoading, error } = useFetch(
        singleGenre,
        {},
        genreId
    )

    return (
        <>
            <div className="genre-container">

                <h1 className="genre-title">{genre.name}</h1>
                <div className="genre-show">
                    {error
                        ? <p className='error-message'>{error}</p>
                        : isLoading
                            ? <p>Loading</p>
                            : genre.media.length > 0
                                ? genre.media.map(media => (<MediaCard key={media._id} media={media} />
                                ))
                                :<p>There are no movies or shows with that genre. Do you know any?</p>
                    }
                </div>
            </div>

        </>
    )
}

