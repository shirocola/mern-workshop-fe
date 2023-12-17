import NavbarComponent from "./NavbarComponent"
import axios from "axios"
import Swal from "sweetalert2"
import { useState } from "react"
const LoginComponent = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const inputValue = name => e => {
        const value = e.target.value
        if (name === "username") {
            setUsername(value)
        } else if (name === "password") {
            setPassword(value)
        }
    }
    const submitForm = async (e) => {
        e.preventDefault()
        console.log("APP URL =", import.meta.env.VITE_APP_API)
        axios
            .post(`${import.meta.env.VITE_APP_API}/login`, { username, password })
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Login success',
                    showConfirmButton: false,
                    timer: 1500
                })
                setUsername("")
                setPassword("")
            })
            .catch(err => {
                Swal.fire(
                    err.response.data.error, 'error')
            })
    }
    return (
        <div className="container p-5">
            <NavbarComponent />
            <h1>Login Page</h1>
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control"
                        id="username"
                        value={username}
                        onChange={inputValue("username")}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control"
                        id="password"
                        value={password}
                        onChange={inputValue("password")}
                    />
                </div>
                <br />
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
        </div>
    )
}

export default LoginComponent