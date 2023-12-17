import NavbarComponent from "./NavbarComponent"
import axios from "axios"
import Swal from "sweetalert2"
import { useState, useEffect } from "react"
import { authenticate } from "../service/authorize"
import { useNavigate } from "react-router-dom"
import { getUser } from "../service/authorize"

const LoginComponent = () => {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({ username: "", password: "" })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setCredentials(prevState => ({ ...prevState, [name]: value }))
    }

    const submitForm = async (e) => {
        e.preventDefault()
        console.log("APP URL =", import.meta.env.VITE_APP_API)

        try {
            const response = await axios.post(`${import.meta.env.VITE_APP_API}/login`, credentials)
            authenticate(response, () => navigate('/create'))

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Login success',
                showConfirmButton: false,
                timer: 1500
            })

            setCredentials({ username: "", password: "" })
        } catch (error) {
            Swal.fire(
                error.response.data.error, 'error')
        }
    }
    useEffect(() => {
        getUser() && navigate('/')
    },[navigate])
    
    return (
        <div className="container p-5">
            <NavbarComponent />
            <h1>Login Page</h1>
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control"
                        id="username"
                        value={credentials.username}
                        onChange={handleInputChange}
                        name="username"
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control"
                        id="password"
                        value={credentials.password}
                        onChange={handleInputChange}
                        name="password"
                    />
                </div>
                <br />
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
        </div>
    )
}


export default LoginComponent