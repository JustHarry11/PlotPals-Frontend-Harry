import { useContext, useState } from "react"
import { loginUser } from "../../services/auth"
import { Link, useNavigate, Navigate } from "react-router"
import { setToken, getUserFromToken } from "../../utils/auth"
import { UserContext } from "../../contexts/UserContext"
import './UserLogin.css'

export default function UserLogin() {
    const { user, setUser } = useContext(UserContext)

    const [userData, setUserData] = useState({
        email: '',
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
                <h1>Log In</h1>
                <div className="input-control">
                    <label htmlFor="email" className="register-login">Email</label>
                    <input type="text" name="email" id="email" placeholder="Email" className="register-input" onChange={handleChange} value={userData.email} required />
                    {error.email && <p className="error-message">{error.email}</p>}
                </div>

                <div className="input-control">
                    <label htmlFor="password" className="register-login">Password</label>
                    <input type="password" name="password" id="password" placeholder="Password" className="register-input" onChange={handleChange} value={userData.password} required />
                    {error.password && <p className="error-message">{error.password}</p>}
                </div>

                {error.message && <p className="error-message">{error.message}</p>}

                <button type="submit">{ isLoading ? 'Logging In...' : 'Log In'}</button>
            </form>
        </section>
    )
}