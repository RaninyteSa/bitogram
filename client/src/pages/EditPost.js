import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const EditPost = () => {
    const { id } = useParams()
    const [post, setPost] = useState({
        caption: '',
        photo: '',
        coment: ''
    })

    const [alert, setAlert] = useState({
        message: '',
        status: ''
    })

    const navigate = useNavigate()

    useEffect(() => {
        axios.get('/api/posts/' + id)
        .then(resp => {
            if(!resp.data) {
                navigate('/')
                return
            }

            setPost(resp.data)
        })
        .catch(error => {
            console.log(error)
            navigate('/')
        })
    }, [alert, navigate])

    const handleForm = (e) => {
        setPost({...post, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.put('/api/posts/edit/' + id, post)
        .then(resp => {
            setAlert({
                message: resp.data,
                status: 'success'
            })

            window.scrollTo(0, 0)

            setTimeout(() => navigate('/'), 2000)
        })
        .catch(error => {
            setAlert({
                message: error.response.data,
                status: 'danger'
            })
        })

    }

    return (
        <div className="containerr"> <h1>Redaguoti</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
               
                <div className="form-control">
                <label>aprasymas:</label>
                    <input type="text" name="caption" onChange={(e) => handleForm(e)} />
                </div>
 
                <div className="form-control">
                    <label>Nuotrauka:</label>
                    <input type="text" name="photo" onChange={(e) => handleForm(e)} />
                </div>
                <div className="form-control">
                    <label>Komentaras:</label>
                    <textarea type="text" name="coment" onChange={(e) => handleForm(e)}></textarea>
                </div>
                <button className="btn btn-primary">Siųsti</button>
                
            </form>
        </div>
    )
}

export default EditPost