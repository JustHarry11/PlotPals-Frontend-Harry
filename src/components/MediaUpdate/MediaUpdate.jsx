import { useContext, useEffect, useState } from 'react'
import './MediaUpdate.css'
import { UserContext } from '../../contexts/UserContext'
import { singleMedia, updateMedia } from '../../services/medias'
import { genreIndex } from '../../services/genres'
import { Navigate, useNavigate, useParams } from 'react-router'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
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
        setFormData({ ...formData, genres: selectedOptions})
    }

    function handleChange({ target: {name, value, type, files} }) {
        if (type === 'file') {
            value = files[0]
        }
        setFormData({...formData, [name]: value})
    }

    async function handleSubmit(event) {
        event.preventDefault()
        setIsLoading(true)
        try {
            const selectedIds = formData.genres.map(genreChange => genreChange.value)
            await updateMedia(mediaId, {...formData, genres: selectedIds})
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
                setFormData({...mediaData, genres: mediaData.genres.map(genre => ({ value: genre._id, label: genre.name }))})
                const { data: genreData } = await genreIndex()
                setGenres(genreData.map(genre => ({ value: genre._id, label: genre.name })))
            } catch (error) {
                setError({...error, preload: 'Failed to preload values'})
            }
        }
        getMediaData()
    }, [mediaId])

    if (!user) return <Navigate to='/login'/>

    if (formData.owner && formData.owner !== user._id) return <Navigate to='/login'/>

    return (
        <section className="form-page">
            <form className='media-edit-form' onSubmit={handleSubmit}>
                <h1>Editing {formData.title}</h1>
                <div className="input-control-edit">
                    <label htmlFor="title">Title</label>
                    <input type='text' name="title" value={formData.title} onChange={handleChange} />
                    {error.title && <p className='error-message-edit'>{error.title}</p>}
                </div>

                <div className="input-control-edit">
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description" cols="30" rows="3" value={formData.description} onChange={handleChange}></textarea>
                    {error.description && <p className='error-message-edit'>{error.description}</p>}
                </div>
                
                <div className="input-control-edit">
                    <label htmlFor="imageUrl">Image URL</label>
                    <input type="file" name="imageUrl" id="imageUrl" onChange={handleChange}/>
                </div>

                <div className="input-control-edit">
                    <label htmlFor="genres">Genres</label>
                    <Select
                        isMulti
                        name='genres'
                        placeholder="Select genres..."
                        options={genres}
                        value={formData.genres}
                        onChange={handleGenreChange}
                    />
                    {error.genres && <p className='error-message-create'>{error.genres}</p>}
                </div>

                <div className="input-control-edit">
                    <label htmlFor="type">Type</label>
                    <select name="type" id="type" value={formData.type} onChange={handleChange}>
                        <option value="" disabled>Select type</option>
                        <option value="movie">Movie</option>
                        <option value="tvshow">TV Show</option>
                    </select>
                    {error.type && <p className='error-message-create'>{error.type}</p>}
                </div>

                {formData.type === 'movie' && (
                    <>
                    <div className="input-control-edit">
                        <label htmlFor="rating">Rating</label>
                        <input type="number" name="rating" id="rating" min="0" max="10" step="0.1" value={formData.rating} onChange={handleChange}/>
                        {error.rating && <p className='error-message-create'>{error.rating}</p>}
                    </div>

                    <div className="input-control-edit">
                        <label htmlFor="length">Length (mins)</label>
                        <input type="number" name="length" id="length" value={formData.length} onChange={handleChange}/>
                        {error.length && <p className='error-message-create'>{error.length}</p>}
                    </div>
                    </>
                )}

                {formData.type === 'tvshow' && (
                    <>
                    <div className="input-control-edit">
                        <label htmlFor="episodeNum">Episode Numbers</label>
                        <input type="number" name="episodeNum" id="episodeNum" value={formData.episodeNum} onChange={handleChange}/>
                        {error.episodeNum && <p className='error-message-create'>{error.episodeNum}</p>}
                    </div>

                    <div className="input-control-edit">
                        <label htmlFor="status">Status</label>
                        <select name="status" id="status" value={formData.status} onChange={handleChange}>
                            <option value="" disabled>Select status</option>
                            <option value="on-going">On-going</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                        {error.status && <p className='error-message-create'>{error.status}</p>}
                    </div>
                    </>
                )}

                <div className="input-control-edit">
                    <label htmlFor="releaseDate">Release Date</label>
                    <input type="number" name="releaseDate" id="releaseDate" value={formData.releaseDate} onChange={handleChange} />
                    {error.releaseDate && <p className='error-message-create'>{error.releaseDate}</p>}
                </div>

                <ErrorMessage message={error.message}/>

                <button type="submit" className='button'>{ isLoading ? `Loading...` : `Update`}</button>
            </form>

        </section>
    )
}