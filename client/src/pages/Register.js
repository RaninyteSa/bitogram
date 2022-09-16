import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    })
    const [alert, setAlert] = useState({
        message: '',
        status: ''
    })

    const navigate = useNavigate()

    const handleForm = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post('/api/users/register', form)
        .then(resp => {
            setAlert({
                message: resp.data,
                status: 'success'
            })

            setTimeout(() => navigate('/'), 1000)
        })
        .catch(error => {
            setAlert({
                message: error.response.data,
                status: 'danger'
            })
        })
    }

    return (
        <div className="containerr">
            <h1>Registracija</h1>
            {alert.message && (
                <div className={'alert alert-' + alert.status}>
                {alert.message}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label>Vardas:</label>
                    <input type="text" name="first_name" onChange={handleForm} />
                </div>
                <div className="form-control">
                    <label>Pavardė:</label>
                    <input type="text" name="last_name" onChange={handleForm} />
                </div>
                <div className="form-control">
                    <label>El. pašto adresas:</label>
                    <input type="email" name="email" onChange={handleForm} required />
                </div>
                <div className="form-control">
                    <label>Slaptažodis:</label>
                    <input type="password" name="password" onChange={handleForm} />
                </div>
                <button className="btn btn-primary">Registruotis</button>
            </form>
        </div>
    )
}

export default Register