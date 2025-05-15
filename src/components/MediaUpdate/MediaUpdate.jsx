import { useContext, useEffect, useState } from 'react'
import './MediaUpdate.css'
import { UserContext } from '../../contexts/UserContext'
import { singleMedia, updateMedia } from '../../services/medias'
import { useNavigate, useParams } from 'react-router'

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
    const { mediaId } = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState({})
    const navigate = useNavigate()

    
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
            console.log(error);
            
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        async function getMediaData() {
            try {
                const { data } = await singleMedia(mediaId)
                setFormData(data)
            } catch (error) {
                setError({...error, preload: 'Failed to preload values'})
            }
        }
        getMediaData()
    }, [mediaId])


    return (
        <section className="form-page">
            <form onSubmit={handleSubmit}>
                <input name="title" value={formData.title} onChange={handleChange} />
                {error.title && <p>{error.title}</p>}
                {/* other fields go here */}
                <button type="submit">{ isLoading ? `Loading...` : `Edit`}</button>
            </form>

        </section>
    )
}