import React, { useEffect, useState } from "react";
import './ImageModal.css';
import { useParams, Link } from 'react-router-dom'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import RestrictedAccess from "../RestrictedAccess/RestrictedAccess";

export default function ImageModal() {

    const { idPhoto } = useParams();
    const [detalle, setDetalle] = useState([]);

    //UseEffect
    useEffect(() => {
        validarURL();
        document.title = "El Blog - Imagen";
        axios.get('https://jsonplaceholder.typicode.com/photos')
            .then(res => {
                const data = res.data;
                for (let x in data) {
                    if (data[x].id === parseInt(idPhoto)) {
                        let json = [
                            idPhoto,
                            data[x].albumId,
                            data[x].title,
                            data[x].url
                        ];
                        setDetalle(json);
                        console.log(detalle);
                        break;
                    }
                }
            })
    }, [])

    //Validar si la imagen seleccionada es la correcta
    const validarURL = () => {
        const idPhotoStorage = JSON.parse(window.localStorage.getItem('PhotoSelected'));
        const valido = true;
        if (parseInt(idPhotoStorage) !== parseInt(idPhoto)) {
            console.log('No es valida');
            return false;
        }

        return valido;
    }

    return (
        //Structure modal.
        <React.Fragment>
            {validarURL() ?
                <div className='modal'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h4 className='modal-title'>{detalle[2]}</h4>
                        </div>
                        <div className='modal-background'>
                            <div className='modal-body'>
                                <img src={detalle[3]} alt={detalle[2]} />
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <Link type="button" to="/myphotos" className="btn btn-dark">Close</Link>
                        </div>
                    </div>
                </div>
                : <RestrictedAccess />
            }
        </React.Fragment>
    )
}