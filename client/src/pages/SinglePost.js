import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import MainContext from '../context/MainContext'




const SinglePost = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [post, setPost] = useState({})
    const [comment, setComment] = useState('')
    const { loggedIn } = useContext(MainContext)
    const [alert, setAlert] = useState({
        message: '',
        status: ''
    })
    const [refresh, setRefresh] = useState(false)


    useEffect(() => {
        axios.get('/api/posts/' + id)
        .then(resp => {
            if(!resp.data) {
                //Pirmąja reikšme perduodame adresą kuriuo nukreipiamas vartotojas negaunant jokios reikšmės
                navigate('/')
                return 
            }

            setPost(resp.data)
        })
        .catch((error) => {
            console.log(error)
            navigate('/')
        })
    }, [id, navigate, refresh])

    const handleForm = (e) => {
        e.preventDefault()

        axios.post('/api/comments/', { comment, postId: id })
        .then(resp => {
            setAlert({
                message: resp.data,
                status: 'success'
            })
            setComment('')

            setRefresh(!refresh)

            setTimeout(() => setAlert({
                message: '',
                status: ''
            }), 2000)
        })
        .catch(error => {
            console.log(error)
            setAlert({
                message: error.response.data,
                status: 'danger'
            })
      
            if(error.response.status === 401)
                setTimeout(() => navigate('/login'), 2000)
        })
    }

    return (
    
        <div className='single-post'>
            <div></div>
            <h1>{post.caption }</h1>
            <div className='img'><img style={{backgroundImage:`url('${post.photo}')`,  backgroundSize: 'cover' ,height: '250px', width: '250px', gap: '15px, 15px' ,justifyContent: 'center', opacity: 1}}src={post.nuotrauka} alt={post.pavadinimas}></img></div>
      
            {post.comments &&
                    <div className="komentarai-kont">
                        <h3 className='komentarai'>Vartotojų komentarai</h3>
                        {post.comments.map(entry => 
                            <li className='komentarai' key={entry.id}>
                                {entry.comment}
                            </li>    
                        )}
                    </div>
                }
            { loggedIn ?
            <div className='komentarai-kont'>
                <h2 className='komentarai'>Palikite savo komentarą</h2>
                {alert.message && (
                        <div className={'my-2 alert alert-' + alert.status}>
                        {alert.message}
                        </div>
                    )}
                <form onSubmit={ (e) => handleForm(e) }>
                    <div>
                    <label className='komentarai'>komentaras</label>
                    <textarea name='comment' onChange={(e) => setComment(e.target.value)}></textarea>   
                    </div>
                    <div>
                        <button className='komentarai'>skelbti komentarą</button>
                    </div>
                </form>
            </div>
            
           : <div className='komentarai'>'Prisijunkite norėdami palikti komentarą'</div> } 


        </div>
    )
}

export default SinglePost