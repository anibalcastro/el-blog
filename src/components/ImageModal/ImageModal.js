import React, {useEffect, useState} from "react";
import './ImageModal.css';
import { useParams, Link } from 'react-router-dom'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'

export default function ImageModal() {

    const {idPhoto} = useParams();
    const [detalle, setDetalle] = useState([]);

    useEffect(() => {
       
        axios.get('https://jsonplaceholder.typicode.com/photos')
        .then(res => {
            const data = res.data;
            for (let x in data){
                if (data[x].id === parseInt(idPhoto)){
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
    },[])

    const cerrarModal = () => {
        window.location.href ='/myphotos'
    }

    return (
        //Structure modal.
        <React.Fragment>
            <div className='modal'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h4 className='modal-title'>{detalle[1]}</h4>
                    </div>
                    <div className='modal-body'>
                        <img src={detalle[3]} alt={detalle[2]}/>
                    </div>
                    <div className='modal-footer'>
                        <button onClick={cerrarModal} className='button'>Close</button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}