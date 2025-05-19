import { NavLink } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { removeToken } from "../../utils/auth";
import './Navbar.css'

export default function NavBar() {

    const { user, setUser } = useContext(UserContext)

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
                                    <NavLink to="/medias/new">Add Media</NavLink>
                                    <NavLink to="/favourites">Your Favourites</NavLink>
                                    <NavLink onClick={handleSignOut} to="/login">Sign Out</NavLink>
                                </>
                            )
                            : (
                                <>
                                    <NavLink to="/register">Register User</NavLink>
                                    <NavLink to="/login">Log In</NavLink>
                                </>

                            )
                        }
                    </nav>
            </div>
        </header>
    )
}