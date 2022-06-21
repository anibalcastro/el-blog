import React from "react";
import "./Header.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Images from '../Images/Logo.png';
import Cookie from 'universal-cookie';
//import {link} from 'react-router-dom';

const cookie = new Cookie();

function Header() {

    const cerrarSesion = () => {
        cookie.remove('id', { path: "/" });
        cookie.remove('name', { path: "/" });
        cookie.remove('username', { path: "/" });
        cookie.remove('email', { path: "/" });
        cookie.remove('adress', { path: "/" });
        cookie.remove('phone', { path: "/" });
        cookie.remove('website', { path: "/" });
        window.location.href = "/";
    }

    const validateSession = () => {
        let valido = false;
        if(cookie.get('id')){
            valido  = true;
        }

        return valido;
    } 

    return (
        <React.Fragment >
            <nav id='header' className="navbar navbar-light bg-light" >
                <a className="navbar-brand" href='localhost:3000/' >
                    <img className='logo' src={Images} alt='logo'></img>
                </a>
                {
                    validateSession() ?
                    <div id="content">
                        <div>
                            <h4 id="welcome">Bienvenido {cookie.get('username')} :-D</h4>
                        </div>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-secondary">Navigation</button>
                            <button type="button" className="btn btn-secondary">Search Album</button>
                            <button type="button" className="btn btn-secondary">Album List</button>
                            <button type="button" className="btn btn-secondary" onClick={() => cerrarSesion()}>Logout</button>
                        </div>
                    </div>
                    : ""
                    
                }


            </nav>
        </React.Fragment>);
}

export default Header;