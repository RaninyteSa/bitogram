import { useState, useEffect, useContext } from 'react'
import convertDate from '../utils/Date'
import { useNavigate, Link } from 'react-router-dom'
import MainContext from '../context/MainContext'
import axios from 'axios'

const Admin = () => {
 
    const [posts, setPosts] = useState([])
    const [alert, setAlert] = useState({
        message: '',
        status: ''
      })
      const [refresh, setRefresh] = useState(false)
      const { loggedIn , userInfo} = useContext(MainContext)
      const navigate = useNavigate()

    useEffect(() => {
        axios.get('/api/posts')
        .then(resp => setPosts(resp.data))
        .catch( error => console.log(error))
    }, [refresh])

    const handleDelete = (id) => {
        if(isNaN(id) || !loggedIn)
          return
        
          axios.delete('/api/posts/delete/' + id)
          .then(resp => {
            setAlert({
              message: resp.data.message,
              status: 'success'
            })
            setRefresh(!refresh)
            
            window.scrollTo(0, 0)
          })
          .catch(error => {
            console.log(error)
            setAlert({
              message: error.response.data,
              status: 'danger'
            })
            window.scrollTo(0, 0)
    
            if(error.response.status === 401)
              setTimeout(() => navigate('/login'), 2000)
          })
          .finally(() => {
            setTimeout(() => setAlert({
              message: '',
              status: ''
            }), 3000)
          })
          
        }

    return (
        <div className='containerrr'>
            <h2>Profilis</h2>
            {alert.message && (
              <div className={'alert alert-' + alert.status}>
                {alert.message}
              </div>
            )}
             {loggedIn && 
                    <div className='msg'>Sveiki, {userInfo.first_name + ' ' + userInfo.last_name} 🖤  </div>
                }
            <table className='table'>
                <tr>
                    <th>ID</th>
                    <th>Nuotrauka</th>
                    <th>Sukurimo data</th>
                    <th>Aprasymas</th>
                    <th>Delete  /  Edit</th>
                </tr>
            </table>
            <tbody>
                {posts.map(post => 
                    <tr>
                        <td>{post.id}</td>
                        <td><div className='img'><img style={{backgroundImage:`url('${post.photo}')`,  backgroundSize: 'cover' ,height: '100px', width: '100px', gap: '15px, 15px' ,justifyContent: 'center', opacity: 1}}src={post.nuotrauka} alt={post.pavadinimas}></img></div></td>
                        <td>{convertDate(post.createdAt)}</td>
                        <td>{post.caption}</td>
                        <td>
                          <button onClick={() => handleDelete(post.id)} className="btn">Delete</button>
                          <Link to={'/admin/edit/' + post.id} className="btn">Edit</Link>
                        </td>
                    </tr>    
                )}
            </tbody>

        </div>

    )
}

export default Admin