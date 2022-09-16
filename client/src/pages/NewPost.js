import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"



const NewPost = () => {

    const navigate = useNavigate()

    const [postForm, setPostForm] = useState({
        caption: '',
        photo: ''
    })
// const [alert, setAlert] = useState()
    const handleForm = (e) => {
        setPostForm({...postForm, [e.target.name]: e.target.name === 'photo' ? e.target.files[0] : e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = new FormData()
        
        for(const key in postForm) {
            form.append(key,postForm[key])
        }
        // const form = new FormData(e.target)

        // for(const key in postForm) {
        //     form.append(key, postForm[key])
        // }
        axios.post('/api/posts/', form)
        // .then(resp => resp.json())
        .then(resp => {console.log(resp)
            
            navigate('/')
        
        })
        .catch(error => console.log(error))
        

    }

    return (
        <div className="containerr">
            <h1>Naujas Postas</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="form-control">
                    <label>Pavadinimas:</label>
                    <input type="text" name="caption" onChange={(e) => handleForm(e)} />
                </div>

                <div className="form-control">
                    <label>Nuotrauka:</label>
                    <input type="file" name="photo" onChange={(e) => handleForm(e)} />
                    
                </div>
                <button className="btn btn-primary">Siųsti</button>
            </form>
        </div>
    )
}

export default NewPost