import { Link } from 'react-router'
import useFetch from '../../hooks/useFetch'
import { genreIndex } from '../../services/genres'
import './GenreIndex.css'

export default function GenreIndex() {

    const { data: genres, isLoading, error } = useFetch(genreIndex, [])

    return (
        <>
            <section className='genre-index'>
                <h1>Genres</h1>
                {error
                    ? <p className='error-message'>{error}</p>
                    : isLoading
                        ? <p>Loading</p>
                        : genres.length > 0
                            ? genres.map(genre => (
                                <Link key={genre._id} to={`/genres/${genre._id}`}>
                                    <article>
                                        <h2>{genre.name} </h2>
                                    </article>
                                </Link>
                            ))
                            : <p>No Genres Found</p>
                }
            </section>

        </>
    )


}

