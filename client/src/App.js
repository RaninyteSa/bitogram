import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState, useEffect } from 'react'
import Home from './pages/Home'
import NewPost from './pages/NewPost'
import NotFound from './pages/404.js'
import EditPost from './pages/EditPost.js'
import SinglePost from './pages/SinglePost.js'
import Header from './components/Header/Header.js'
import Register from './pages/Register';
import Login from './pages/Login'
import Logout from './pages/Logout'
import MainContext from './context/MainContext';
import React from 'react';
import axios from 'axios';
import Admin from './pages/admin';


const App = () => {

  const [ alert, setAlert ] = useState({
    message: '',
    status: ''
  })

  const [loggedIn, setLoggedIn] = useState(false)
  const [userInfo, setUserInfo] = useState({})

  const contextValues = { loggedIn, setLoggedIn, userInfo, setUserInfo, alert, setAlert }

  useEffect(() => {
    axios.get('/api/users/check-auth')
    .then(resp =>{
      console.log(resp);
      setLoggedIn(true)
      setUserInfo(resp.data)
      
    })
  }, [])

  return (
    <BrowserRouter>
    <MainContext.Provider value={contextValues}>
    <Header  />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/post/:id" element={<SinglePost />} />
      {/* <Route path="/edit">
          <Route path=":id" element={<EditPost />} />
          </Route> */}
        {loggedIn && userInfo.role === 1 &&
          <>
            <Route path="/admin" >
            <Route index element={<Admin />} />  
            <Route path="new-post" element={<NewPost />} />
            <Route path="edit/:id" element={<EditPost />} />
            </Route>
          </>
        }
      </Routes>
    </MainContext.Provider>
  </BrowserRouter>
  )
}

export default App
