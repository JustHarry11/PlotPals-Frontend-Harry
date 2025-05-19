import { mediasIndex } from "../../services/medias";
import useFetch from "../../hooks/useFetch";
import './MediaIndex.css'
import { useState } from "react";
import MediaCard from "../MediaCard/MediaCard";

export default function MediaIndex() {

    const { data: medias, isLoading, error } = useFetch(mediasIndex, [])

    const [selectedType, setSelectedType] = useState('all')

    const handleFilterChange = (form) => {
        setSelectedType(form.target.value)
    }

    const filteredMedias = medias?.filter(media => {
        if (selectedType === 'all') return true
        return media.type === selectedType
    })
    
    return (
        <>
            <h1 className="media-index-title">Media</h1>
            <div className="media-filter-container">
                <label htmlFor="type-select">Filter by type: </label>
                <select id="type-select" value={selectedType} onChange={handleFilterChange}>
                    <option value="all">All</option>
                    <option value="tvshow">TV Shows</option>
                    <option value="movie">Movies</option>
                </select>
            </div>


            <section className="media-index-list">
                {error
                    ? <p className="error-message">{error}</p>
                    : isLoading
                        ? <p className="loading">Loading...</p>
                        : filteredMedias.length > 0
                            ? filteredMedias.map(media => ( <MediaCard key={media._id} media={media}/>
                            ))
                            : <p>No media found. Please try again later.</p>

                }

            </section>
        </>
    )
}