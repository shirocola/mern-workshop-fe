import { useState } from "react"
import NavbarComponent from "./NavbarComponent"
import axios from "axios"
import Swal from "sweetalert2"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

const FormComponent = () => {
    const [state, setState] = useState({
        title: '',
        author: '',
    })
    const {title, author} = state

    const [content, setContent] = useState('')

    const inputValue=name=>event=>{
        console.log(name)
        setState({...state, [name]: event.target.value})
    }

    const submitContent = (event) => {
        setContent(event)
    }

    const submitForm = async (event) => {
        event.preventDefault()
        console.log("APP URL =", import.meta.env.VITE_APP_API)
        axios
        .post(`${import.meta.env.VITE_APP_API}/create`, {title, content, author})
        .then(()=>{
           Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Your blog has been posted',
                showConfirmButton: false,
                timer: 1500
           })
           setState({...state,title:"", author:""})
           setContent("")
        })
        .catch(err=>{
            Swal.fire(
               err.response.data.error,'error')
        })
    }
    return (
        <div className='container'>
            <NavbarComponent />
            <h1>Write your blog</h1>
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label htmlFor="title">Name</label>
                    <input type="text" className="form-control"
                    value={title} 
                    onChange={inputValue("title")} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="body">Detail</label>
                    <ReactQuill theme="snow" value={content} onChange={submitContent}
                    className="pb-5 mb-3"
                    placeholder="write your blog"
                    style={{border: '1px solid #666'}} />
                </div>
                <div className="form-group">
                    <label htmlFor="body">Author</label>
                    <input type="text" className="form-control" 
                    value={author}
                    onChange={inputValue("author")}
                    />
                </div>
                <br/>
                <input type="submit" className="btn btn-primary" value="Submit" />
            </form>
        </div>
    )
}

export default FormComponent