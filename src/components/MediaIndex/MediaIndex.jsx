import { mediasIndex } from "../../services/medias";
import { Link } from 'react-router'
import useFetch from "../../hooks/useFetch";
import './MediaIndex.css'

export default function MediaIndex() {
    
    const { data: medias, isLoading, error } = useFetch(mediasIndex, [])

    return (
        <>
            <h1>Media</h1>
            <section className="media-list">
            {error
                ? <p className="error-message">{error}</p>
                : isLoading
                    ? <p className="loading">Loading...</p>
                    : medias.length > 0
                        ? medias.map(media => (
                            <Link key={media._id} to={`/medias/${media._id}`}>
                                <article>
                                    <h2>{media.title}</h2>
                                </article>
                            </Link>
                        ))
                        : <p>No media found. Please try again later.</p>
            
            }

            </section>
        </>
    )
}