import { useState, useEffect, useContext } from 'react'
import MainContext from '../context/MainContext'
import { Link, useNavigate } from 'react-router-dom'

import axios from 'axios'

const Home = () => {
  const { loggedIn } = useContext(MainContext)
  const [posts, setPosts] = useState([])
  const [alert, setAlert] = useState({
    message: '',
    status: ''
  })
  const [keyword, setKeyword] = useState('')
  const [refresh, setRefresh] = useState(false)
  const navigate = useNavigate()
  
    
      
        useEffect(() => {
          axios.get('/api/posts/')
          .then(resp => { 
            setPosts(resp.data)
          })
          .catch(error => {
            setAlert({
              message: error.response.data,
              status: 'danger'
            })
          })
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

        const handleSearch = (e) => {
          
          e.preventDefault()

          if(keyword === '')
            return setRefresh(!refresh)

            axios.get('/api/posts/search/' + keyword)
            .then(resp => {
              setPosts(resp.data)
            })
            .catch(error => {
              console.log(error)
              setAlert({
                message: error.response.data,
                status: 'danger'
              })
              window.scrollTo(0,0)
            })
            .finally(() => {
              setTimeout(() => setAlert({
                message: '',
                status: ''
              }), 3000)
            }) 
          }
      
        return (
          
          <div className="container">
            {alert.message && (
              <div className={'alert alert-' + alert.status}>
                {alert.message}
              </div>
            )}
            <div className='filter'>
              <form className='frm' onSubmit={handleSearch}>
                <div className='search' >
                  <input type='text' 
                  className='form=control'
                  placeholder='Paieskos fraze'
                  onChange={(e) => setKeyword(e.target.value)}
                  onBlur={(e) => {
                    if(keyword === '')
                    setRefresh(!refresh)
                  }}
                  />
                  <button className='btn'>IEŠKOTI</button>
                </div>
              </form>
            </div>
            <div className="articles">
              {posts && posts.map(posts => {
                return (

                 
                  <div key={posts.id} className="box">
                    <h3>{posts.caption}</h3>
                     
                    <div className="image" style={{backgroundImage:`url('${posts.photo}')`, opacity: 1}}>
                      <img src={''} alt={''} />
                    </div>
                    
                   
                    { loggedIn &&
                    <>
                    <Link to={'/post/' + posts.id} className="btn">Skaityti plačiau</Link>
                    {/* <button onClick={() => handleDelete(posts.id)} className="btn">Delete</button>
                    <Link to={'/edit/' + posts.id} className="btn">Edit</Link> */}
                    </>
                  }
                  </div>
                 
                )
              })}
                    {/* <div>{isLoading ? 'LOADING...' : <Pagination />}</div> */}
            </div>
          </div>
        );
      }


export default Home;