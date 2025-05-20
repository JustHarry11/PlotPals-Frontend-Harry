import { useContext, useEffect, useState } from 'react'
import './MediaCreate.css'
import { UserContext } from '../../contexts/UserContext'
import { createMedia } from '../../services/medias'
import { genreIndex } from '../../services/genres'
import { Navigate, useNavigate } from 'react-router'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import Select from 'react-select'

export default function MediaCreate() {
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

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState({})
    const navigate = useNavigate()

    
    function handleGenreChange(selectedOptions) {
        const selectedIds = selectedOptions.map(genreChange => genreChange.value)
        setFormData({ ...formData, genres: selectedIds})
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

        const newFormData = {...formData}

        if (newFormData.type === 'movie') {
            delete newFormData.episodeNum
            delete newFormData.status
        }

        if (newFormData.type === 'tvshow') {
            delete newFormData.rating
            delete newFormData.length
        }
        
        try {
            const { data } = await createMedia(newFormData)
            navigate(`/medias/${data._id}`)
        } catch (error) {
            setError(error.response.data)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
    async function getGenres() {
        try {
        const { data } = await genreIndex()
        setGenres(data)
        } catch (error) {
        setError({ ...error, preload: 'Failed to load genres' })
        }
    }

    getGenres()
    }, [])

    if (!user) return <Navigate to='/login' />

    return (
        <section className="form-page">
            <form className='media-create-form' onSubmit={handleSubmit}>
                <h1>Add New Media</h1>
                <div className="input-control-create">
                    <label htmlFor="title">Title</label>
                    <input type='text' name="title" value={formData.title} onChange={handleChange} />
                    {error.title && <p className='error-message-create'>{error.title}</p>}
                </div>

                <div className="input-control-create">
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description" cols="30" rows="3" value={formData.description} onChange={handleChange}></textarea>
                    {error.description && <p className='error-message-create'>{error.description}</p>}
                </div>
                
                <div className="input-control-create">
                    <label htmlFor="imageUrl">Image URL</label>
                    <input type="file" name="imageUrl" id="imageUrl" onChange={handleChange}/>
                    {error.imageUrl && <p className='error-message-create'>{error.imageUrl}</p>}
                </div>

                <div className="input-control-create">
                    <label htmlFor="genres">Genres</label>
                    <Select
                        isMulti
                        name='genres'
                        placeholder="Select genres..."
                        className='input-genre'
                        options={genres.map(genre => ({ value: genre._id, label: genre.name }))}
                        value={genres
                        .filter(genre => formData.genres.includes(genre._id))
                        .map(genre => ({ value: genre._id, label: genre.name }))
                        }
                        onChange={handleGenreChange}
                    />
                    {error.genres && <p className='error-message-create'>{error.genres}</p>}
                </div>

                <div className="input-control-create">
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
                    <div className="input-control-create">
                        <label htmlFor="rating">Rating</label>
                        <input type="number" name="rating" id="rating" min="0" max="10" step="0.1" value={formData.rating} onChange={handleChange}/>
                        {error.rating && <p className='error-message-create'>{error.rating}</p>}
                    </div>

                    <div className="input-control-create">
                        <label htmlFor="length">Length (mins)</label>
                        <input type="number" name="length" id="length" value={formData.length} onChange={handleChange}/>
                        {error.length && <p className='error-message-create'>{error.length}</p>}
                    </div>
                    </>
                )}

                {formData.type === 'tvshow' && (
                    <>
                    <div className="input-control-create">
                        <label htmlFor="episodeNum">Episode Numbers</label>
                        <input type="number" name="episodeNum" id="episodeNum" value={formData.episodeNum} onChange={handleChange}/>
                        {error.episodeNum && <p className='error-message-create'>{error.episodeNum}</p>}
                    </div>

                    <div className="input-control-create">
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

                <div className="input-control-create">
                    <label htmlFor="releaseDate">Release Date</label>
                    <input type="number" name="releaseDate" id="releaseDate" value={formData.releaseDate} onChange={handleChange} />
                    {error.releaseDate && <p className='error-message-create'>{error.releaseDate}</p>}
                </div>

                <ErrorMessage message={error.message}/>
                
                <button type="submit" className='button'>{ isLoading ? `Loading...` : `Submit`}</button>
            </form>

        </section>
    )
}