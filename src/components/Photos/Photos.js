import React, { useEffect, useState } from "react";
import axios from 'axios';
import './Photos.css';
import Cookies  from "universal-cookie";
import 'bootstrap/dist/css/bootstrap.min.css';

function Photos() {
    const cookies = new Cookies();
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        document.title = 'El Blog - Photos';
        if (!cookies.get('id')) {
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
            <div>My Photos</div>



        </React.Fragment>
    )
}

export default Photos;