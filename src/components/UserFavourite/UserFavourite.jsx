import { Navigate } from 'react-router'
import useFetch from '../../hooks/useFetch'
import { favIndex } from '../../services/favourites'
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import MediaCard from '../MediaCard/MediaCard'
import './UserFavourite.css'

export default function FavouriteIndex(){
    
    const { user } = useContext(UserContext)
    const { data: favourites, isLoading, error } = useFetch(user ? favIndex : null, [])

    if (!user) return <Navigate to='/login'/>
    
    return (
        <>
            <h1 className='user-favourites-title'>
                { user.username.charAt(0).toUpperCase() + user.username.slice(1) }'s Favourites
            </h1>

            <section className='favourites-list'>
                {error
                    ? <p className='error-message'>{error}</p>
                    : isLoading
                        ? <p>Loading</p>
                        : favourites.length > 0
                            ? favourites.map(favourite => <MediaCard key={favourite._id} media={favourite}/>)
                        : <p>No Favourites Found</p>
                }
            </section>
        
        </>
    )
}