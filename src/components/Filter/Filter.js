import React, { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import './Filter.css';

export default function Filter(props) {

    //Se guarda el estado.
    const [inputValues, setInputValues] = useState({ filter: '' });
    const [album, setAlbum] = useState([]);
    const urlAlbums = 'https://jsonplaceholder.typicode.com/albums';

    //Captura que lo que esta escribiendo.
    const handleOnChange = useCallback(event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });
        const newArray = filtrar(event.target.value);
        props.setArray(newArray);
        //console.log(inputValues.filter);
        //console.log(albumFilter);
    });

    const filtrar = (terminoBuscar) => {
        let resultadoBusqueda = album.filter((elemento) => {
            if (elemento.title.toString().includes(terminoBuscar)){
                return elemento;
            }
        })
        props.setArray(resultadoBusqueda);
        console.log('resultadoBusqueda',resultadoBusqueda);
    }



useEffect(() => {
    //Set title
    document.title = 'ElBlog - Dashboard';
    //isLogged();
    const user = JSON.parse(window.localStorage.getItem('UserLogged'))
    const idUser = user.id;
    const albumUser = [];

    //console.log('IdUser:', idUser);

    axios.get(urlAlbums)
        .then(res => {
            //Data
            const response = res.data;
            for (let x in response) {
                if (response[x].userId === parseInt(idUser)) {
                    albumUser.push({
                        'userId': response[x].userId,
                        'id': response[x].id,
                        'title': response[x].title
                    });
                }
            }
            setAlbum(albumUser);
        });

}, []);

return (
    <React.Fragment>
        <form className='formFilter'>
            <input onChange={handleOnChange} type='text' className='filterInput' name='filter' placeholder='Search Album' ></input>
        </form>
    </React.Fragment>
)
}

