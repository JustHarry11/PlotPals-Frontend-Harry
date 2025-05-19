import './MediaCard.css'
import { Link } from 'react-router'

export default function MediaCard({ media }) {
    
    return (
        <div className="media-card">
        <Link to={`/medias/${media._id}`}>
            <img src={media.imageUrl} alt={media.title} className='media-image'/>
        </Link>
            <div className="media-content">
            <Link to={`/medias/${media._id}`}>
                <h2 className="media-title">{media.title}</h2>
            </Link>
                <div className="media-details">
                    {media.type === 'movie' ? (
                        <>
                            <div className="media-top-row">
                                <span>⭐{media.rating}</span>
                                <span>❤️{media.favourites.length}</span>
                            </div>
                            <div className="media-bottom-row">
                                <span>🎞️{media.length} mins</span>
                                <span>{media.releaseDate}</span>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="media-top-row">
                                <span>📺{media.episodeNum} Ep</span>
                                <span>❤️{media.favourites.length}</span>
                            </div>
                            <div className="media-bottom-row">
                                <span>{media.status.charAt(0).toUpperCase() + media.status.slice(1)}</span>
                                <span>{media.releaseDate}</span>
                            </div>
                        </>
                    )}
                </div>

                <div className="media-genres">
                    {media.genres.map(genre => (
                        <Link key={genre._id} to={`/genres/${genre._id}`}>
                        <span  className='genre-tag'>{genre.name}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}