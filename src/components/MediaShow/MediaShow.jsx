import useFetch from '../../hooks/useFetch'
import './MediaShow.css'
import { UserContext } from '../../contexts/UserContext'
import { singleMedia } from '../../services/medias'
import { Link, useParams } from 'react-router'

import MediaDelete from '../MediaDelete/MediaDelete'
import { useContext } from 'react'


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
                        <p>{media.imageUrl}</p>
                        <Link className='update-media' to={`/medias/${mediaId}/edit`}>Edit</Link>
                        <MediaDelete />
                    </section>
                )

        }   
        </>
    )
}