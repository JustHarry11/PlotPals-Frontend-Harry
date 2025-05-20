import { useContext, useState } from "react"
import { loginUser } from "../../services/auth"
import { Link, useNavigate, Navigate } from "react-router"
import { setToken, getUserFromToken } from "../../utils/auth"
import { UserContext } from "../../contexts/UserContext"
import './UserLogin.css'

export default function UserLogin() {
    const { user, setUser } = useContext(UserContext)

    const [userData, setUserData] = useState({
        identity: '',
        password: ''
    })

    const [error, setError] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    async function handleSubmit(evt) {
        evt.preventDefault()
        setIsLoading(true)
        try {
            const { data } = await loginUser(userData)
            setToken(data.token)
            setUser(getUserFromToken())
            navigate(`/home`)
        } catch (error) {
            setError(error.response.data)
        } finally {
            setIsLoading(false)
        }
    }

    async function handleChange(evt) {
        const copiedObject = { ...userData }
        copiedObject[evt.target.name] = evt.target.value
        setUserData(copiedObject)
        setError({ ...error, [evt.target.name]: '' })
    }

    if(user) {
        return <Navigate to="/home" />
    }

    return (
        <section id="form-page">
            <form className="form" onSubmit={handleSubmit}>
                <h1 className="login-title">Log In</h1>
                <div className="input-control">
                    <label htmlFor="identity" className="login-label">Email or Username</label>
                    <input type="text" name="identity" id="identity" placeholder="Email or Username" className="login-input" onChange={handleChange} value={userData.identity} required />
                    {error.identity && <p className="error-message">{error.email}</p>}
                </div>

                <div className="input-control">
                    <label htmlFor="password" className="login-label">Password</label>
                    <input type="password" name="password" id="password" placeholder="Password" className="login-input" onChange={handleChange} value={userData.password} required />
                    {error.password && <p className="error-message">{error.password}</p>}
                </div>

                {error.message && <p className="error-message">{error.message}</p>}

                <button type="submit" className="login-btn">{ isLoading ? 'Logging In...' : 'Log In'}</button>
            </form>
        </section>
    )
}