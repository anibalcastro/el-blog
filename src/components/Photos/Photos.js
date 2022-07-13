import React, { useEffect, useState } from "react";
import axios from 'axios';
import Filter from '../FilterPhoto/FilterPhoto';
import './Photos.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Photos() {
    const [photos, setPhotos] = useState([]); //Estado de las fotos del album
    const [idAlbum, setIdAlbum] = useState([]); //Estado del album seleccionado.
    const urlPhotos = 'https://jsonplaceholder.typicode.com/photos'; //Url APY


    //Validar si esta logueado
    const isLogged = () => {
        const user = JSON.parse(window.localStorage.getItem('UserLogged'));
        if (!user) {
            window.location = ('/');
        }
    }

    //useEffect
    useEffect(() => {
        document.title = 'El Blog - Photos';
        isLogged();
        setIdAlbum(JSON.parse(window.localStorage.getItem('AlbumSelected')));
        console.log(idAlbum);
        setIdAlbum(getphotos());
        /*setPhotoFilter(getphotos());*/
    }, []);

    //Funcion para obtener las fotos.
    const getphotos = () => {
        const albumSelected = localStorage.getItem('AlbumSelected');
        //console.log(Number(albumSelected));

        let photosAlbum = [];
        axios.get(urlPhotos)
            .then(res => {
                //Data
                const response = res.data;
                for (let x in response) {
                    if (response[x].albumId === Number(albumSelected)) {
                        photosAlbum.push({
                            'albumId': response[x].albumId,
                            'id': response[x].id,
                            'title': response[x].title,
                            'url': response[x].url,
                            'thumbnailUrl': response[x].thumbnailUrl
                        })
                    }

                }
                setPhotos(photosAlbum);
            });
    }

    //Funcion para ridereccionar al modal.
    const imageSelect = (idImage) => {
        window.localStorage.setItem('PhotoSelected', JSON.stringify(idImage));
        window.location = (`/myphotos/${idImage}`);
    }

    //Set result in setphotos.
    const setPhotoFilter = (arrayFilter) => {
        const indefinido = undefined;
        const arreglo = indefinido || arrayFilter;
        if (arreglo[0] === false) {
            console.log('dataUser ID', idAlbum.idImage)
            getphotos(idAlbum);
        }
        else {
            setPhotos(arrayFilter);

        }
    }

    return (
        <React.Fragment>
            <div className="container">
                <div id='contHeader' className="jumbotron">
                    <h1>Photos</h1>
                </div>
            </div>
            <Filter setArray={setPhotoFilter} />


            {photos[0] ? <div className="row">
                {photos.map((photo) => (
                    <div id='cont' className="col-lg-4 col-sm-6" key={photo.id}>
                        <div id='contImg' className="thumbnail img-responsive">

                            <img className='carpeta' src={photo.thumbnailUrl} alt={photo.title} onClick={() => imageSelect(photo.id)} />
                            <h6>{photo.title}</h6>
                        </div>
                    </div>
                ))}
            </div> : <div className='loading'> <h4>Not found...</h4> </div>
            }



        </React.Fragment>
    )
}

export default Photos;