import React, { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import './FilterPhoto.css';

export default function FilterPhoto(props) {

    //Se guarda el estado.
    const [inputValues, setInputValues] = useState({ filter: '' });
    const [photo, setPhoto] = useState([]);
    const urlPhotos = 'https://jsonplaceholder.typicode.com/photos';

    //Captura que lo que esta escribiendo.
    const handleOnChange = useCallback(event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });
        console.log(event.target.value);
        console.log(photo);
        const newArray = filtrar(event.target.value);
        props.setArray(newArray);
        //console.log(inputValues.filter);
        //console.log(albumFilter);
    });

    const filtrar = (terminoBuscar) => {
        let resultadoBusqueda = photo.filter((elemento) => {
            if (elemento.title.toString().includes(terminoBuscar)) {
                return elemento;
            }
        })
        props.setArray(resultadoBusqueda);
        console.log('resultadoBusqueda', resultadoBusqueda);
    }



    useEffect(() => {
        //Set title
        document.title = 'ElBlog - Photos';
        //isLogged();
        const user = JSON.parse(window.localStorage.getItem('UserLogged'))
        const idUser = user.id;
        const photoUser = [];
        const albumSelected = JSON.parse(window.localStorage.getItem('AlbumSelected'));

        //console.log('IdUser:', idUser);

        axios.get(urlPhotos)
            .then(res => {
                //Data
                const response = res.data;
                //console.log(response);
                for (let x in response) {
                    if (response[x].albumId === parseInt(albumSelected)) {
                        photoUser.push(response[x]);
                    }
                    setPhoto(photoUser);
                }

            });

    }, []);

    return (
        <React.Fragment>
            <form className='formFilterPhoto'>
                <input onChange={handleOnChange} type='text' className='filterInput' name='filter' placeholder='Search Photo' ></input>
            </form>
        </React.Fragment>
    )
}