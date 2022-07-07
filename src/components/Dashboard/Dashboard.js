import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';


function Dashboard() {

    const [album, setAlbum] = useState([]);
    const [dataUser, setDataUser] = useState([]);
    const urlAlbums = 'https://jsonplaceholder.typicode.com/albums';

    const isLogged = () => {
        const user = JSON.parse(window.localStorage.getItem('UserLogged'));
        if (!user) {
            window.location = ('/');
        }
    }

    useEffect(() => {
        //Set title
        document.title = 'ElBlog - Dashboard';
        isLogged();
        const user = JSON.parse(window.localStorage.getItem('UserLogged'))
        setDataUser(user);
        const idUser = user.id;
        const albumUser = [];

        console.log('State: ',dataUser);
        console.log('IdUser:', idUser);
        
        axios.get(urlAlbums)
            .then(res => {
                //Data
                const response = res.data;
                setAlbum(response);
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

    

    const setIdAlbum = (idAlbum) => {
        const url = `myphotos`;
        window.localStorage.setItem('AlbumSelect', JSON.stringify(idAlbum));
        window.location = url;
    }

    return (
        <React.Fragment>
            <div className="container">
                <div id='contHeader' className="jumbotron">
                    <h1>Albums</h1>
                    <p>You find your albums here.</p>
                </div>
            </div>

            {album[0] ? <div className="row">
                {album.map((albums) => (
                    <div id='cont' className="col-lg-4 col-sm-6" key={albums.id}>
                        <div id='contImg' className="thumbnail img-responsive">
                            <button className="boton-transparente" onClick={() => setIdAlbum(albums.id)}  title={albums.id}><img className='carpeta' src="https://img.icons8.com/material/480/folder-invoices--v1.png" alt={albums.title} /> </button>
                            <h6>{albums.title}</h6>
                        </div>
                    </div>
                ))}
            </div> : <div className='loading'> <h4>Loading...</h4> </div>
            }
        </React.Fragment>
    )
}

export default Dashboard;