import { useState, useEffect } from "react"
import NavbarComponent from "./NavbarComponent"
import axios from "axios"
import Swal from "sweetalert2"
import { useParams } from 'react-router-dom'
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { getToken } from "../service/authorize"

const EditFormComponent = () => {
    const [state, setState] = useState({
        title: '',
        content: '',
        author: '',
        slug: ''
    })
    const {title, author, slug} = state
    const params = useParams()

    const [content, setContent] = useState('')

    const submitContent = (event) => {
        setContent(event)
    }

    // fetch data from api
    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_APP_API}/blog/${params.slug}`)
            .then(response => {
                const {title, author, content, slug} = response.data
                setState(prevState => ({...prevState, title, author, content, slug}))
                setContent(content)
            })
            .catch(err => {
                alert(err)
            })
    }, [params.slug])

    const showUpdateForm = () => {
        return (
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label htmlFor="title">Name</label>
                    <input type="text" className="form-control"
                    id="title"
                    value={title}
                    onChange={inputValue("title")}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <ReactQuill theme="snow" value={content} onChange={submitContent}
                    className="pb-5 mb-3"
                    id="content"
                    placeholder="write your blog"
                    style={{border: '1px solid #666'}} />
                </div>
                <div className="form-group">
                    <label htmlFor="author">Author</label>
                    <input type="text" className="form-control"
                    id="author"
                    value={author}
                    onChange={inputValue("author")}
                    />
                </div>
                <br/>
                <input type="submit" className="btn btn-primary" value="Update" />
            </form>
        )
    }

    const inputValue=name=>event=>{
        console.log(name)
        setState({...state, [name]: event.target.value})
    }
    const submitForm = async (event) => {
        event.preventDefault()
        console.log("APP URL =", import.meta.env.VITE_APP_API)
        axios
        .put(`${import.meta.env.VITE_APP_API}/blog/${slug}`, {title, content, author},
        {
            headers:{
                authorization: `Bearer ${getToken()}`
            }
        })
        .then(response=>{
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Your blog has been updated',
                showConfirmButton: false,
                timer: 1500
              })
            const {title, content, author, slug} = response.data
            setState({...state, title, author, slug})
            setContent(content)
        })
        .catch(err=>{
            Swal.fire(
               err.response.data.error,'error')
        })
    }
    return (
        <div className='container'>
            <NavbarComponent />
            <h1>Update your blog</h1>
            {showUpdateForm()}
        </div>
    )
}

export default EditFormComponent