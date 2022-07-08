import React, { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import './Filter.css';

export default function Filter(props) {

    //Se guarda el estado.
    const [inputValues, setInputValues] = useState({ filter: '' });
    const [albumFilter, setAlbumFilter] = useState([]);
    const [album, setAlbum] = useState([]);
    const urlAlbums = 'https://jsonplaceholder.typicode.com/albums';

    //Captura que lo que esta escribiendo.
    const handleOnChange = useCallback(event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });
        const newArray = filter();
        props.setArray(newArray);
        //console.log(inputValues.filter);
        //console.log(albumFilter);
    });

    //Filtro
    const filter = () =>{
        let buscar = inputValues.filter;
        //console.log(buscar);
        let newArray = [];
        if(buscar === ""){
            newArray.push(album);
        }
        else{
            for (let x in album){
                if (album[x].title.includes(buscar)){
                  //console.log("Existe", album[x].title);
                  newArray.push(album[x]);
                }else{
                  const separar = album[x].title.split(" ");
                  //console.log(separar);
                  for (let y in separar){
                    if (separar[y] === buscar){
                      //console.log("Existe separando", separar[y]);
                      newArray.push(album[x]);
                    }
                  }
          
                }
              }
              
        }
        //console.log(newArray);
        setAlbumFilter(newArray);
        props.setArray(newArray);
        return newArray;
      }



useEffect(() => {
    //Set title
    document.title = 'ElBlog - Dashboard';
    //isLogged();
    const user = JSON.parse(window.localStorage.getItem('UserLogged'))
    const idUser = user.id;
    const albumUser = [];

    console.log('IdUser:', idUser);

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

