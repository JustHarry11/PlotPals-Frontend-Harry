import { Link } from 'react-router'
import useFetch from '../../hooks/useFetch'
import { favHome } from '../../services/favourites'

export default function FavouriteHome() {

    const { data: favourites, isLoading, error } = useFetch(favHome, [])

    const favouriteMovies = [...favourites]
        .filter(favourite => favourite.type === 'movie')
        .sort((a, b) => b.favourites.length - a.favourites.length)
        .slice(0, 5)

    const favouriteTVShows = [...favourites]
        .filter(favourite => favourite.type === 'tvshow')
        .sort((a, b) => b.favourites.length - a.favourites.length)
        .slice(0, 5)
        
    return (
        <>
            <section className='favourite-list'>
                <h1>Favourite Movies</h1>
                {error
                    ? <p className='error-message'>{error}</p>
                    : isLoading
                        ? <p>Loading</p>
                        : favouriteMovies.length > 0
                            ? favouriteMovies.map(favourite => (
                                <Link key={favourite._id} to={`/medias/${favourite._id}`}>
                                    <article>
                                        <h2>{favourite.title}  ♥️  {favourite.favourites.length}</h2>
                                    </article>
                                </Link>
                            ))
                            : <p>No Favourites Found</p>
                }
            </section>

            <section className='favourite-list'>
                <h1>Favourite Shows</h1>
                {error
                    ? <p className='error-message'>{error}</p>
                    : isLoading
                        ? <p>Loading</p>
                        : favouriteTVShows.length > 0
                            ? favouriteTVShows.map(favourite => (
                                <Link key={favourite._id} to={`/medias/${favourite._id}`}>
                                    <article>
                                        <h2>{favourite.title}  ♥️  {favourite.favourites.length}</h2>
                                    </article>
                                </Link>
                            ))
                            : <p>No Favourites Found</p>
                }
            </section>

        </>
    )
}