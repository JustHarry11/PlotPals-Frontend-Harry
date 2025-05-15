import { NavLink } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { removeToken } from "../../utils/auth";

export default function NavBar() {

    const { user, setUser } = useContext(UserContext)

    const handleSignOut = () => {
        removeToken()
        setUser(null)
    }

    return (
        <header>
            <div className="brand-logo">
                <NavLink to="/home">🎥</NavLink>
            </div>
            <nav>
                <NavLink to="/medias">Media</NavLink>

                {user
                    ? (
                        <>
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
        </header>
    )
}