import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import NavbarComponent from './NavbarComponent'
import parse from 'html-react-parser'

const SingleComponent = () => {
    const [blog, setBlog] = useState('')
    const params = useParams()

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_APP_API}/blog/${params.slug}`)
            .then(response => {
                setBlog(response.data)
            })
            .catch(err => {
                alert(err)
            })
    }, [params.slug])
    return (
        <div className='container p-5'>{blog ? (
            <div>
            <NavbarComponent />
                <h1>{blog.title}</h1>
                <div>{parse(blog.content)}</div>
                <p className='text-muted'> author: {blog.author} , publish: {new Date(blog.createdAt).toLocaleString()}</p>
            </div>
        ) : (
            <div>loading...</div>
        )}
        </div>
    )
}

export default SingleComponent