import React, { useEffect, useState } from "react";
import axios from 'axios';
import './Photos.css';
import Cookies from "universal-cookie";
import 'bootstrap/dist/css/bootstrap.min.css';

function Photos() {
    const cookies = new Cookies();
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        document.title = 'El Blog - Photos';
        if (cookies.get('id')) {
            axios.get('https://jsonplaceholder.typicode.com/photos')
                .then(res => {
                    //Data
                    const response = res.data;
                    setPhotos(response);
                    console.log('data: ', response);
                    console.log('state: ', photos);
                });
        }
    }, []);


    return (
        <React.Fragment>
            {photos[0] ? <div className="row">
                {photos.map((photo) => (
                    <div id='cont' className="col-lg-4 col-sm-6" key={photo.id}>
                        <div id='contImg' className="thumbnail img-responsive">
                            <a href={`/myphotos `} title={photo.title}><img className='carpeta' src={photo.thumbnailUrl} alt={photo.title} /> </a>
                            <h6>{photo.title}</h6>
                        </div>
                    </div>
                ))}
            </div> : <div className='loading'> <h4>Loading...</h4> </div>
            }



        </React.Fragment>
    )
}

export default Photos;