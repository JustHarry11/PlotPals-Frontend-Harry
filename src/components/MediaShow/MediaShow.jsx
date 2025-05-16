import useFetch from '../../hooks/useFetch'
import './MediaShow.css'
import { UserContext } from '../../contexts/UserContext'
import { singleMedia } from '../../services/medias'
import { Link, useParams } from 'react-router'

import MediaDelete from '../MediaDelete/MediaDelete'
import { useContext } from 'react'
import Select from 'react-select/base'
import { MultiValue } from 'react-select/animated'


export default function MediaShow() {
    const { mediaId } = useParams()
    const { user } = useContext(UserContext)

    const { data: media, isLoading, error } = useFetch(
        singleMedia,
        {},
        mediaId
    )

    return (
        <>
        {error 
            ? <p className="error-message">{error}</p>
            : isLoading
                ? <p className="loading">Loading...</p>
                : (
                    <section className="single-media">
                        <h1>{media.title}</h1>
                        <img src={media.imageUrl} alt="" width="250px"/>
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