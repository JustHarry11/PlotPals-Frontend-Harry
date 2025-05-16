import useFetch from '../../hooks/useFetch'
import './MediaShow.css'
import { UserContext } from '../../contexts/UserContext'
import { singleMedia } from '../../services/medias'
import { Link, useParams } from 'react-router'
import MediaDelete from '../MediaDelete/MediaDelete'
import { useContext, useEffect, useState } from 'react'
import Select from 'react-select/base'
import { favDelete, favCreate } from '../../services/favourites'



export default function MediaShow() {
    const { mediaId } = useParams()
    const { user } = useContext(UserContext)
    const [isFavourited, setIsFavourited] = useState(false)

    const { data: media, setData: setMedia, isLoading, error } = useFetch(
        singleMedia,
        {},
        mediaId
    )



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
            console.error('Error toggling favourite:', error)
        }
    }

    return (
        <>
            {error
                ? <p className="error-message">{error}</p>
                : isLoading
                    ? <p className="loading">Loading...</p>
                    : (
                        <section className="single-media">
                            <h1>{media.title}</h1>
                            <img src={media.imageUrl} alt="" width="250px" />
                            <h3>Genres:</h3>

                            <Select isMulti isDisabled={true} value={media.genres.map(genre => ({
                                value: genre._id,
                                label: genre.name
                            }))}
                                components={{
                                    MultiValueRemove: () => null,
                                    DropdownIndicator: () => null
                                }}
                            />
                            {media.type === 'movie' &&
                                <div className="movie">
                                    <h3>Rating:</h3>
                                    <p>{media.rating}</p>
                                    <h3>Length:</h3>
                                    <p>{media.length}</p>
                                </div>
                            }
                            {media.type === 'tvshow' &&
                                <div className="tvshow">
                                    <h3>Episodes:</h3>
                                    <p>{media.episodeNum}</p>
                                    <h3>Status:</h3>
                                    <p>{media.status}</p>
                                </div>
                            }
                            <h3>Description:</h3>
                            <p>{media.description}</p>

                            <h3>♥️</h3>
                            <p>{media.favourites.length}</p>

                            {user && (
                                <button
                                    className={`favourite-button ${isFavourited ? 'favourited' : ''}`}
                                    onClick={handleToggleFavourite}
                                >
                                    {isFavourited ? '💔 Remove Favourite' : '❤️ Add to Favourites'}
                                </button>
                            )}


                            {user && media.owner && user._id === media.owner &&
                                <div className="media-controls">
                                    <Link className='button' to={`/medias/${mediaId}/edit`}>Edit</Link>
                                    <MediaDelete />
                                </div>
                            }
                        </section>
                    )

            }
        </>
    )
}