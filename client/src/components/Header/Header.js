import { Link } from 'react-router-dom'
import { useContext } from 'react'
import MainContext from '../../context/MainContext'

const Header = () => {
     const{ loggedIn, userInfo }  = useContext(MainContext)
    return (
        <div className="cont">
            <header className="header">
            <Link to="/" className="new">
                <span className="fs-4"> ❤❤❤BitoGram❤❤❤ </span>
            </Link>

            
            <div className="navbar">

<div>
    <li>
        <Link to="/" className="nav-link px-2 text-dark">Visi Postai</Link>
    </li>
</div>
<div className="dropdown">
    <button className="dropbtn">Pasirinkimai 
    <i className="fa fa-caret-down"></i>
    </button>
    <div className="dropdown-content">
    {loggedIn && userInfo.role === 1 &&
                <>
    <div>
        <li>
            <Link to="/admin" className="nav-link px-2 text-dark">Profilis</Link>
        </li>
    </div>
    <div>
        <li>
            <Link to="/admin/new-post" className="nav-link px-2 text-dark">Naujas Postas</Link>
        </li>
    </div>
    </>
}
{loggedIn ? (
                <>
    <div>
        <li>
            <Link to="/logout" className="nav-link px-2 text-dark">Atsijungti</Link>
        </li>
    </div>
    </>
                ) : (
                <>

    <div>
        <li>
            <Link to="/register" className="nav-link px-2 text-dark">Registruotis</Link>
        </li>
    </div>
    <div>
        <li>
            <Link to="/login" className="nav-link px-2 text-dark">Prisijungti</Link>
        </li>
    </div>
    </>
                )}
                    {loggedIn && 
                    <div className='msg'>Sveiki, {userInfo.first_name + ' ' + userInfo.last_name} 🖤  </div>
                }
 
{/* </div>
            <ul className="nav nav-pills">
                <li className="nav-item">
                    <Link to="/" className="nav-link" aria-current="page">Visi Postai</Link>
                </li>
                {loggedIn && userInfo.role === 1 &&
                <>
                    <li className="nav-item">
                        <Link to="/admin" className="nav-link" aria-current="page">Profilis</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/admin/new-post" className="nav-link" aria-current="page">Naujas Postas</Link>
                    </li>

                </>
                }
                {loggedIn ? (
                <>
                    <li className="nav-item">
                        <Link to="/logout" className="nav-link" aria-current="page">atsijungti</Link>
                    </li>
                </>
                ) : (
                <>
                    <li className="nav-item">
                    <Link to="/register" className="nav-link" aria-current="page">Registracija</Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/login" className="nav-link" aria-current="page">Prisijungti</Link>
                    </li>
                </>
                )}
            </ul>
            {loggedIn && 
                    <div className='msg'>Sveiki, {userInfo.first_name + ' ' + userInfo.last_name} 🖤  </div>
                } */}
                </div>
                </div>
                </div>
            </header>
        
        </div>
    
    )
}



export default Header