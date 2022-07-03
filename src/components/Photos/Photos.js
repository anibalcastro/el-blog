import React, { useEffect, useState } from "react";
import axios from 'axios';
import './Photos.css';
import Cookies from "universal-cookie";
import 'bootstrap/dist/css/bootstrap.min.css';
import ImageModal from '../ImageModal/ImageModal';

function Photos() {
    const cookies = new Cookies();
    const [photos, setPhotos] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    //const showModal = () => setIsOpen((prev) => !prev);




    useEffect(() => {
        console.log(isOpen);
        document.title = 'El Blog - Photos';
        if (cookies.get('id')) {
            axios.get('https://jsonplaceholder.typicode.com/photos')
                .then(res => {
                    //Data
                    const response = res.data;
                    setPhotos(response);
                   // console.log('data: ', response);
                    //console.log('state: ', photos);
                });
        }
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