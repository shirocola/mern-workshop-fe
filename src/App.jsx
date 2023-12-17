/* eslint-disable no-unused-vars */
import './App.css'
import NavbarComponent from './components/NavbarComponent'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import parse from 'html-react-parser'
import { getUser } from './service/authorize'
import { getToken } from './service/authorize'

function App() {
  const [blogs, setBlogs] = useState([])

  const fetchData = async () => {
    const response = axios
      .get(`${import.meta.env.VITE_APP_API}/blogs`)
      .then(response => {
        setBlogs(response.data)
      })
      .catch(err => {
        alert(err)
      })
  }
  useEffect(() => {
    fetchData()
  }, [])

  const confirmDelete = slug => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBlog(slug)
      }
    })
  }

  const deleteBlog = slug => {
    axios
      .delete(`${import.meta.env.VITE_APP_API}/blog/${slug}`,
      {
        headers: {
          authorization: `Bearer ${getToken()}`
        }
      })
      .then(response => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Your blog has been deleted',
          showConfirmButton: false,
          timer: 1500
        })
        fetchData()
      }).catch(err => {
        Swal.fire(
          err.response.data.error, 'error')
      })
  }

  const confirmUpdate = slug => {
    Swal.fire({
      title: 'Do you want to update this blog?',
      icon: 'warning',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        updateBlog(slug)
      }
    }
    )
  }

  const updateBlog = slug => {
    axios
      .put(`${import.meta.env.VITE_APP_API}/blog/${slug}`)
      .then(response => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Your blog has been updated',
          showConfirmButton: false,
          timer: 1500
        })
        fetchData()
      }).catch(err => {
        Swal.fire(
          err.response.data.error, 'error')
      })
  }


  return (
    <div className="container p-5">
      <NavbarComponent />
      {blogs.map((blog, index) => (
        <div className='row' key={index} style={{ borderBottom: '1px solid black' }}>
          <div className='col pt=3 pb2'>
            <Link to={`blog/${blog.slug}`}>
              <h2>{blog.title}</h2>
            </Link>
            <div>{parse(blog.content)}</div>
            <p className='text-muted'> author: {blog.author} , publish: {blog.createdAt}</p>
            {getUser() && (
              <div>
                <button className='btn btn-outline-danger' onClick={() => confirmDelete(blog.slug)}>Delete</button> &nbsp;
                <Link className='btn btn-outline-warning' to={`/blog/edit/${blog.slug}`}>Edit</Link>
              </div>
            )}
          </div>
        </div>
      )

      )
      }
    </div>
  )
}

export default App
