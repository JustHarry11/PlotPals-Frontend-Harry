import { Link, useParams } from "react-router";
import useFetch from "../../hooks/useFetch";
import { singleGenre } from "../../services/genres";

export default function GenreShow() {

    const { genreId } = useParams()
    const { data: genre, isLoading, error } = useFetch(
        singleGenre,
        {},
        genreId
    )

    return (
        <>
            <section className='genre-show'>
                <h1>{genre.name}</h1>
                {error
                    ? <p className='error-message'>{error}</p>
                    : isLoading
                        ? <p>Loading</p>
                        : genre.media.length > 0
                            ? genre.media.map(media => (
                                <Link key={media._id} to={`/medias/${media._id}`}>
                                    <article>
                                        <h2>{media.title} </h2>
                                    </article>
                                </Link>
                            ))
                            : <p>There are no movies or shows with that genre. Do you know any?</p>
                }
            </section>
        </>
    )
}

