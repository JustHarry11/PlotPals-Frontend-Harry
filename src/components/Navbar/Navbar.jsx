import { NavLink } from "react-router";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { removeToken } from "../../utils/auth";
import './Navbar.css'

export default function NavBar() {

    const [userSettings, setUserSettings] = useState(false)
    const { user, setUser } = useContext(UserContext)

    const handleSignOut = () => {
        removeToken()
        setUser(null)
    }

    function toggleDropdown() {
        setUserSettings(drop => !drop)
    }

    function closeDropdown() {
        setUserSettings(false)
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
                                    <div onClick={toggleDropdown} className="username-toggle">
                                        { user.username.charAt(0).toUpperCase() + user.username.slice(1) }
                                    </div>
                                    {userSettings && (
                                    <div className="dropdown-content">
                                        <NavLink to="/medias/new" onClick={closeDropdown}>Add Media</NavLink>
                                        <NavLink to="/favourites" onClick={closeDropdown}>Your Favourites</NavLink>
                                        <NavLink onClick={() => {handleSignOut(); closeDropdown();}} to="/login">Sign Out</NavLink>
                                    </div>
                                    )}

                                </div>
                                </>
                            )
                            : (
                                <>
                                    <div onClick={toggleDropdown} className="username-toggle">
                                        Account
                                    </div>
                                    {userSettings && (
                                    <div className="dropdown-content">
                                        <NavLink to="/register" onClick={closeDropdown}>Register</NavLink>
                                        <NavLink to="/login" onClick={closeDropdown}>Log In</NavLink>
                                    </div>
                                    )}
                                </>

                            )
                        }
                    </nav>
            </div>
        </header>
    )
}