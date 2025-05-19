import { Link } from 'react-router'
import useFetch from '../../hooks/useFetch'
import { genreIndex } from '../../services/genres'
import './GenreIndex.css'

export default function GenreIndex() {

    const { data: genres, isLoading, error } = useFetch(genreIndex, [])

    return (
        <>
            <section className='genre-index'>
                <h1 className="genre-title-index">Genres</h1>
                <div className='genre-grid'>
                    {error
                        ? <p className='error-message'>{error}</p>
                        : isLoading
                            ? <p>Loading</p>
                            : genres.length > 0
                                ? genres.map(genre => (
                                    <Link key={genre._id} to={`/genres/${genre._id}`}>
                                        <div className='genre'>
                                            <h2>{genre.name}</h2>
                                        </div>
                                    </Link>
                                ))
                                : <p>No Genres Found</p>
                    }
                </div>

            </section>

        </>
    )


}

