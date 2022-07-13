import React, { useEffect, useState } from 'react'
import './Navigator.css';
import { Link } from 'react-router-dom';

const Navigator = () => {
  const [dataUser, setDataUser] = useState([]);

  //Validar si esta logueado.
  const isLogged = () => {
    const user = JSON.parse(window.localStorage.getItem('UserLogged'));
    if (!user) {
      window.location = ('/');
    }
  }

  //useEffect
  useEffect(() => {
    isLogged();
    const user = JSON.parse(window.localStorage.getItem('UserLogged'));
    setDataUser(user);
  }, [])


  return (
    <React.Fragment>
      <div className="container navi">
        <h1>Bienvenido {dataUser.name}</h1>
        <p>Muchas gracias por usar nuestra plataforma</p>
        <Link to={'/dashboard'} className='btn btn-dark'>Dashboard</Link>
      </div>
    </React.Fragment>
  )
}

export default Navigator;