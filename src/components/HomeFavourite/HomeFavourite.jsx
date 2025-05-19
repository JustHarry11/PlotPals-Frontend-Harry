import useFetch from '../../hooks/useFetch'
import { favHome } from '../../services/favourites'
import './HomeFavourite.css'
import MediaCard from '../MediaCard/MediaCard'

export default function FavouriteHome() {

    const { data: favourites, isLoading, error } = useFetch(favHome, [])

    const favouriteMovies = [...favourites]
        .filter(favourite => favourite.type === 'movie')
        .sort((a, b) => b.favourites.length - a.favourites.length)
        .slice(0, 6)

    const favouriteTVShows = [...favourites]
        .filter(favourite => favourite.type === 'tvshow')
        .sort((a, b) => b.favourites.length - a.favourites.length)
        .slice(0, 6)

    return (
        <div className="home-container">

            <div className="media-section">
                <h1 className='home-title'>Favourite Movies</h1>
                <div className="media-grid">
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p className="error-message">{error}</p>
                    ) : (
                        favouriteMovies.map(media => <MediaCard key={media._id} media={media} />)
                    )}
                </div>
            </div>

            <div className="media-section">
                <h1 className='home-title'>Favourite TV Shows</h1>
                <div className="media-grid">
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p className="error-message">{error}</p>
                    ) : (
                        favouriteTVShows.map(media => <MediaCard key={media._id} media={media} />)
                    )}
                </div>
            </div>

        </div>
    )
}