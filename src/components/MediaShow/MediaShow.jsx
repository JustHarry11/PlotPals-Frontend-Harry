import useFetch from '../../hooks/useFetch'
import './MediaShow.css'
import { UserContext } from '../../contexts/UserContext'
import { singleMedia } from '../../services/medias'
import { Link, useNavigate, useParams } from 'react-router'
import MediaDelete from '../MediaDelete/MediaDelete'
import { useContext, useEffect, useState } from 'react'
import { favDelete, favCreate } from '../../services/favourites'
import { removeToken } from '../../utils/auth'



export default function MediaShow() {
    const { mediaId } = useParams()
    const { user, setUser } = useContext(UserContext)
    const [isFavourited, setIsFavourited] = useState(false)

    const [showSpoiler, setShowSpoiler] = useState(false)

    const { data: media, setData: setMedia, isLoading, error } = useFetch(
        singleMedia,
        {},
        mediaId
    )

    const navigate = useNavigate()

    useEffect(() => {
        if (media && user) {
            const hasFavourtied = media.favourites?.some(id => id === user._id)
            setIsFavourited(hasFavourtied)
        }
    }, [media, user])

    const handleToggleFavourite = async () => {
        try {
            const serviceFunction = isFavourited ? favDelete : favCreate

            const response = await serviceFunction(mediaId)
            setMedia(response.data)
        } catch (error) {
            if (error.response?.status === 401) {
                removeToken()
                setUser(null)
                await navigate('/login', {
                    state: { sessionExpired: 'Your session has expirted. Please log in again.'}
                })         
            }
        }
    }

    return (
        <>
            {error
                ? <p className="error-message">{error}</p>
                : isLoading
                    ? <p className="loading">Loading...</p>
                    : (
                        <div className="single-media">
                            <h1>{media.title}</h1>
                            <img src={media.imageUrl} alt="" width="250px" />

                            <div>
                                {media.type === 'movie' ? (
                                    <>
                                        <div className="show-top-row">
                                            <span>⭐ {media.rating}</span>
                                            <span>❤️ {media.favourites.length}</span>
                                        </div>
                                        <div className="show-bottom-row">
                                            <span>🎞️ {media.length} mins</span>
                                            <span>📆 {media.releaseDate}</span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="show-top-row">
                                            <span>📺 {media.episodeNum} Ep</span>
                                            <span>❤️ {media.favourites.length}</span>
                                        </div>
                                        <div className="show-bottom-row">
                                            <span>📶 {media.status.charAt(0).toUpperCase() + media.status.slice(1)}</span>
                                            <span>📆 {media.releaseDate}</span>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className='show-genres'>
                                <span>
                                    <h3>Genres:</h3>
                                    <div className="media-genres">
                                        {media.genres.map(genre => (
                                            <Link key={genre._id} to={`/genres/${genre._id}`}>
                                                <span className='genre-tag-show'>{genre.name}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </span>
                            </div>

                            <h3>Description:</h3>
                            <button className="button" onClick={() => setShowSpoiler(prev => !prev)}>
                                {showSpoiler ? 'Hide Spoiler' : 'Show Spoiler'}
                            </button>
                            <p className={`media-description ${showSpoiler ? 'revealed' : 'hidden'}`}>
                                {media.description}
                            </p>

                            {user && (
                                <button
                                    className={`button favourite-button ${isFavourited ? 'favourited' : ''}`}
                                    onClick={handleToggleFavourite}
                                >
                                    {isFavourited ? '💔 Remove Favourite' : '❤️ Add to Favourites'}
                                </button>
                            )}


                            {user && media.owner && user._id === media.owner &&
                                <div className="media-controls">
                                    <span><Link className='button' to={`/medias/${mediaId}/edit`}>Edit</Link></span>
                                    <span><MediaDelete /></span>
                                </div>
                            }
                        </div>
                    )

            }
        </>
    )
}