import { NavLink } from "react-router";
import { useContext, useState, useRef } from "react";
import { UserContext } from "../../contexts/UserContext";
import { removeToken } from "../../utils/auth";
import './Navbar.css'

export default function NavBar() {

    const [userSettings, setUserSettings] = useState(false)
    const { user, setUser } = useContext(UserContext)

    const hoverProfile = useRef(false)
    const hoverContent = useRef(false)

    const openDropdown = () => setUserSettings(true)

    const handleMouseLeave = () => {
        setTimeout(() => {
            if (!hoverProfile.current && !hoverContent.current) {
                setUserSettings(false)
            }
        }, 100)
    }

    const handleSignOut = () => {
        removeToken()
        setUser(null)
    }


    return (
        <header>
            <div className="top-navigation">
                <div className="nav-left">
                    <div className="brand-logo">
                        <NavLink to="/home">🎥</NavLink>
                    </div>
                    <NavLink to="/medias">Media</NavLink>
                    <NavLink to="/genres">Genre</NavLink>
                </div>
                <div className="nav-middle">
                    <NavLink to="/home">
                        <h1>PlotPals</h1>
                    </NavLink>
                </div>
                <nav className="nav-right">
                    {user
                        ? (
                            <>
                                <div className="profile-dropdown">
                                    <div className="username-toggle" 
                                        onMouseEnter={() => {hoverProfile.current = true; openDropdown()}}
                                        onMouseLeave={() => {hoverProfile.current = false; handleMouseLeave()}}>
                                        {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
                                    </div>
                                    {userSettings && (
                                        <div className="dropdown-content"
                                            onMouseEnter={() => (hoverContent.current = true)}
                                            onMouseLeave={() => { hoverContent.current = false; handleMouseLeave()}}>
                                            <NavLink to="/medias/new" >Add Media</NavLink>
                                            <NavLink to="/favourites" >Your Favourites</NavLink>
                                            <NavLink onClick={() => { handleSignOut() }} to="/login">Sign Out</NavLink>
                                        </div>
                                    )}
                                </div>
                            </>
                        )
                        : (
                            <>
                                <div className="profile-dropdown">
                                    <div className="username-toggle"
                                        onMouseEnter={() => { hoverProfile.current = true; openDropdown(); }}
                                        onMouseLeave={() => { hoverProfile.current = false; handleMouseLeave() }}>
                                        Account
                                    </div>
                                    {userSettings && (
                                        <div className="dropdown-content"
                                            onMouseEnter={() => (hoverContent.current = true)}
                                            onMouseLeave={() => { hoverContent.current = false; handleMouseLeave() }}>
                                            <NavLink to="/register">Register</NavLink>
                                            <NavLink to="/login">Log In</NavLink>
                                        </div>
                                    )}
                                </div>
                            </>

                        )
                    }
                </nav>
            </div>
        </header>
    )
}