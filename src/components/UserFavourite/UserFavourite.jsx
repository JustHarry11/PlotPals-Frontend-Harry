import { Link, Navigate } from 'react-router'
import useFetch from '../../hooks/useFetch'
import { favIndex } from '../../services/favourites'
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'

export default function FavouriteIndex(){
    
    const { user } = useContext(UserContext)
    const { data: favourites, isLoading, error } = useFetch(user ? favIndex : null, [])

    if (!user) return <Navigate to='/login'/>
    
    return (
        <>
            <h1>{ user.username.charAt(0).toUpperCase() + user.username.slice(1) } Favourites</h1>
            <section className='favourite-list'>
                {error
                    ? <p className='error-message'>{error}</p>
                    : isLoading
                        ? <p>Loading</p>
                        : favourites.length > 0
                            ? favourites.map(favourite => (
                                <Link key={favourite._id} to={`/medias/${favourite._id}`}>
                                    <article>
                                        <h2>{favourite.title}</h2>
                                    </article>
                                </Link>
                            ))
                        : <p>No Favourites Found</p>
                }
            </section>
        
        </>
    )
}