import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';


function Dashboard() {
    const cookies = new Cookies();
    const [album, setAlbum] = useState([]);


    useEffect(() => {
        document.title = 'ElBlog - Dashboard';
        if (!cookies.get('id')) {
            window.location.href = "/";
        }
        else {
            let albumUser = [];
            const idUser = cookies.get('id');
            axios.get('https://jsonplaceholder.typicode.com/albums')
                .then(res => {
                    //Data
                    const response = res.data;
                    for (let x in response) {
                        if (response[x].userId === idUser) {
                            albumUser.push({
                                'userId': response[x].userId,
                                'id': response[x].id,
                                'title': response[x].title
                            });
                        }
                    }
                    setAlbum(albumUser);
                });
        }
    });

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
                                <a href={`/myphotos `} title={albums.id}><img className='carpeta' src="https://img.icons8.com/material/480/folder-invoices--v1.png" alt={albums.title} /> </a>
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