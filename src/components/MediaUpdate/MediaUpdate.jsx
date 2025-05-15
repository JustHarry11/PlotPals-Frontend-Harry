import { useContext, useEffect, useState } from 'react'
import './MediaUpdate.css'
import { UserContext } from '../../contexts/UserContext'
import { singleMedia, updateMedia } from '../../services/medias'
import { genreIndex } from '../../services/genres'
import { useNavigate, useParams } from 'react-router'
import Select from 'react-select'

export default function MediaUpdate() {
    const { user } = useContext(UserContext)
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        imageUrl: '',
        rating: '',
        genres: [],
        episodeNum: '',
        status: '',
        length: '',
        type: '',
        releaseDate: ''
    })
    const [genres, setGenres] = useState([])

    const { mediaId } = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState({})
    const navigate = useNavigate()

    
    function handleGenreChange(selectedOptions) {
        const selectedIds = selectedOptions.map(genreChange => genreChange.value)
        setFormData({ ...formData, genres: selectedIds})
    }

    function handleChange({ target: {name, value} }) {
        setFormData({...formData, [name]: value})
    }

    async function handleSubmit(event) {
        event.preventDefault()
        setIsLoading(true)
        try {
            await updateMedia(mediaId, formData)
            navigate(`/medias/${mediaId}`)
        } catch (error) {
            setError(error.response.data)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        async function getMediaData() {
            try {
                const { data: mediaData } = await singleMedia(mediaId)
                setFormData(mediaData)
                const { data: genreData } = await genreIndex()
                setGenres(genreData)
            } catch (error) {
                setError({...error, preload: 'Failed to preload values'})
            }
        }
        getMediaData()
    }, [mediaId])


    return (
        <section className="form-page">
            <form onSubmit={handleSubmit}>
                <div className="input-control">
                    <label htmlFor="title">Title</label>
                    <input type='text' name="title" value={formData.title} onChange={handleChange} />
                    {error.title && <p>{error.title}</p>}
                </div>

                <div className="input-control">
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description" cols="30" rows="3" value={formData.description} onChange={handleChange}></textarea>
                </div>
                
                <div className="input-control">
                    <label htmlFor="imageUrl">Image URL</label>
                    {/* Add image handler */}
                </div>

                <div className="input-control">
                    <label htmlFor="genres">Genres</label>
                    <Select
                        isMulti
                        name='genres'
                        placeholder="Select genres..."
                        options={genres.map(genre => ({ value: genre._id, label: genre.name }))}
                        value={genres
                        .filter(genre => formData.genres.includes(genre._id))
                        .map(genre => ({ value: genre._id, label: genre.name }))
                        }
                        onChange={handleGenreChange}
                    />
                </div>

                {formData.type === 'movie' && (
                    <>
                    <div className="input-control">
                        <label htmlFor="rating">Rating</label>
                        <input type="number" name="rating" id="rating" value={formData.rating} onChange={handleChange}/>
                    </div>

                    <div className="input-control">
                        <label htmlFor="length">Length (mins)</label>
                        <input type="number" name="length" id="length" value={formData.length} onChange={handleChange}/>
                    </div>
                    </>
                )}

                {formData.type === 'tvshow' && (
                    <>
                    <div className="input-control">
                        <label htmlFor="episodeNum">Episode Numbers</label>
                        <input type="number" name="episodeNum" id="episodeNum" value={formData.episodeNum} onChange={handleChange}/>
                    </div>

                    <div className="input-control">
                        <label htmlFor="status">Status</label>
                        <select name="status" id="status" value={formData.status} onChange={handleChange}>
                            <option value="" disabled>Select status</option>
                            <option value="on-going">On-going</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                    </>
                )}

                <div className="input-control">
                    <label htmlFor="type">Type</label>
                    <select name="type" id="type" value={formData.type} onChange={handleChange}>
                        <option value="" disabled>Select type</option>
                        <option value="movie">Movie</option>
                        <option value="tvshow">TV Show</option>
                    </select>
                </div>

                <div className="input-control">
                    <label htmlFor="releaseDate">Release Date</label>
                    <input type="text" name="releaseDate" id="releaseDate" value={formData.releaseDate} onChange={handleChange} />
                </div>

                <button type="submit">{ isLoading ? `Loading...` : `Submit`}</button>
            </form>

        </section>
    )
}