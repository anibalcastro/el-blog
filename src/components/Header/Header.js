import React from "react";
import "./Header.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Images from '../Images/Logo.png';
import {Link} from 'react-router-dom';

function Header() {

    //Storage name to user logged
    let name = '';

    //Function to logout
    const cerrarSesion = () => {
        localStorage.removeItem('UserLogged');
        localStorage.removeItem('AlbumSelected');
        localStorage.removeItem('PhotoSelected');
        localStorage.removeItem('filterActive');
        window.location.href = "/";
    }

    //Funtion to show menu
    const validateSession = () => {
        let valido = false;
        const userLogged = JSON.parse(localStorage.getItem('UserLogged'));
        if(userLogged){
            name = userLogged.name;
            valido  = true;
        }

        return valido;
    } 

    return (
        <React.Fragment >
            <nav id='header' className="navbar navbar-light bg-light" >
                <Link className="navbar-brand" to='localhost:3000/' >
                    <img className='logo' src={Images} alt='logo'></img>
                </Link>
                {
                    validateSession() ?
                    <div id="content">
                        <div>
                            <h4 id="welcome">{name}</h4>
                        </div>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <Link type="button" to="/dashboard/navigator" className="btn btn-secondary">Navigator</Link>
                            <Link type="button" to="/dashboard"  className="btn btn-secondary">Album List</Link>
                            <button type="button" className="btn btn-secondary" onClick={() => cerrarSesion()}>Logout</button>
                        </div>
                    </div>
                    : ""
                    
                }


            </nav>
        </React.Fragment>);
}

export default Header;