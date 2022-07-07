import React, { useEffect, useState } from "react";
import axios from 'axios';
import './Photos.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Photos(props) {
    const [photos, setPhotos] = useState([]);
    const [idAlbum, setIdAlbum] = useState([]);
    const urlPhotos = 'https://jsonplaceholder.typicode.com/photos';

    const isLogged = () => {
        const user = JSON.parse(window.localStorage.getItem('UserLogged'));
        if (!user) {
            window.location = ('/');
        }
    }

    useEffect(() => {
        document.title = 'El Blog - Photos';
        isLogged();
        setIdAlbum(props.albumId);
        console.log(props);
        console.log(idAlbum);
        const albumSelected = localStorage.getItem('AlbumSelect');
        console.log(Number(albumSelected));
        
        let photosAlbum = [];
        axios.get(urlPhotos)
            .then(res => {
                //Data
                const response = res.data;
                for (let x in response){
                    if (response[x].albumId === Number(albumSelected)){
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
    }, []);


    return (
        <React.Fragment>
            <div className="container">
                <div id='contHeader' className="jumbotron">
                    <h1>Photos</h1>
                    <p>--------------------------------------------------------------</p>
                </div>
            </div>

            {photos[0] ? <div className="row">
                {photos.map((photo) => (
                    <div id='cont' className="col-lg-4 col-sm-6" key={photo.id}>
                        <div id='contImg' className="thumbnail img-responsive">
                            <a href={`/myphotos/${photo.id}`}>
                                <img className='carpeta' src={photo.thumbnailUrl} alt={photo.title} />
                                <h6>{photo.title}</h6>
                            </a>


                        </div>
                    </div>
                ))}
            </div> : <div className='loading'> <h4>Loading...</h4> </div>
            }



        </React.Fragment>
    )
}

export default Photos;