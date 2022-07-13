import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';
import Filter from '../Filter/Filter';



function Dashboard() {

    const [album, setAlbum] = useState([]);
    const [dataUser, setDataUser] = useState([]);
    const urlAlbums = 'https://jsonplaceholder.typicode.com/albums'; //URL APY


    //Autentication.
    const isLogged = () => {
        const user = JSON.parse(window.localStorage.getItem('UserLogged'));
        if (!user) {
            window.location = ('/');
        }
    }

    //UseEffect
    useEffect(() => {
        //Set title
        document.title = 'ElBlog - Dashboard';
        isLogged();
        const user = JSON.parse(window.localStorage.getItem('UserLogged'))
        setDataUser(user);
        setAlbum(getAlbums(user));
        setAlbumsFilter(getAlbums(user));
    }, []);


    //Set album selected
    const setIdAlbum = (idAlbum) => {
        const url = `myphotos`;
        window.localStorage.setItem('AlbumSelected', JSON.stringify(idAlbum));
        window.location = url;
    }

    //Function to get Albums 
    const getAlbums = (user) => {
        const idUser = user.id;
        //console.log('idUser', idUser);
        const albumUser = [];
        axios.get(urlAlbums)
            .then(res => {
                //Data
                const response = res.data;
                //console.log(response);
                for (let x in response) {
                    if (parseInt(response[x].userId) === parseInt(idUser)) {
                        albumUser.push(response[x]);
                    }
                }
                console.log('albumUser', albumUser);
                setAlbum(albumUser);
            });
        return albumUser;
    }

    //Set albums 
    const setAlbumsFilter = (arrayFilter) => {
        const indefinido = undefined;
        const arreglo = indefinido || arrayFilter;
        if (arreglo[0] === false) {
            console.log('dataUser ID', dataUser.id)
            getAlbums(dataUser.id);

        }
        else {
            setAlbum(arrayFilter);
        }
    }

    return (
        <React.Fragment>
            <div className="container">
                <div id='contHeader' className="jumbotron">
                    <h1>Albums</h1>
                    <p>You find your albums here.</p>
                </div>
            </div>
            <Filter setArray={setAlbumsFilter} />
            {
                album[0] ? <div className="row">
                    {album.map((albums) => (
                        <div id='cont' className="col-lg-4 col-sm-6" key={albums.id}>
                            <div id='contImg' className="thumbnail img-responsive">
                                <img className='carpeta' src="https://img.icons8.com/material/480/folder-invoices--v1.png" alt={albums.title} onClick={() => setIdAlbum(albums.id)} />
                                <h6>{albums.title}</h6>
                            </div>
                        </div>
                    ))}
                </div> : <div className='loading'> <h4>NOT FOUND...</h4> </div>

            }
        </React.Fragment>
    )
}

export default Dashboard;