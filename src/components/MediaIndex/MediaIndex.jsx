import { useEffect, useState } from "react";
import { mediasIndex } from "../../services/medias";

export default function MediaIndex() {
    
    const [ medias, setMedias ] = useState([])


    useEffect(() => {
        async function getMedia() {
            try {
                const { data } = await mediasIndex()

                setMedias(data)        
            } catch (error) {
                console.log(error);
                
            }
        }
        getMedia()
    }, [])
    return (
        <h1>hello{medias.length > 0 && medias.map(media => (
            <h1>{media.title}</h1>
        ))}</h1>
    )
}