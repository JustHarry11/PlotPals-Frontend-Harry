import { useState } from "react"
import { useNavigate, useParams } from "react-router"
import { deleteMedia } from "../../services/medias"

export default function MediaDelete() {
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const { mediaId } = useParams()
    const navigate = useNavigate()

    async function handleDelete() {
        setIsLoading(true)
        try {
            await deleteMedia(mediaId)
            navigate('/medias')
        } catch (error) {
            setError(error.response.data.message)
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <>
        <button className="button" onClick={handleDelete}>{isLoading ? 'Deleting...' : 'Delete'}</button>
        { error && <p className="error-message">{error}</p>}
        </>
    )
}