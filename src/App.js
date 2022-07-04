import React,{useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';


import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Photos from './components/Photos/Photos';
import NotFound from './components/NotFound/NotFound';
import ImageModal from './components/ImageModal/ImageModal';


function App(props) {

 //Storage users, album, photos
  const [users, setUsers] = useState([]);
  const [idAlbum, setIdAlbum] = useState([]);
  //const [photos, setPhotos] = useState([]);

  //Set state users
  const setUser = (params) => {
    setUsers(params);
  }

  //Set state albums
  const setAlbums = (params) => {
    setIdAlbum(params)
  }

  

  return (
    <div >
      <Router>
        <Header exist={users} />
        <Routes>
        <Route exact path="/" element={<Login set={setUser} />}/>
        <Route exact path="/dashboard" element={<Dashboard  user={users} albumId={setAlbums} />}/>
        <Route exact path="/myphotos" element={<Photos albumId={idAlbum} />}/>
        <Route exact path="/myphotos/:idPhoto" element={<ImageModal />}/>
        <Route exact path="*" element={<NotFound />}/>

        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
