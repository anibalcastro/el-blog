import React from 'react'
import './RestrictedAcces.css';
import {Link} from 'react-router-dom';

const RestrictedAccess = () => {
  return (
    <React.Fragment>
         <div className="contenedor">
                <h1>ERROR RESTRICTED ACCESS</h1>
                <Link to={'/myphotos'}>Back</Link>
            </div>
    </React.Fragment>
  )
}

export default RestrictedAccess
