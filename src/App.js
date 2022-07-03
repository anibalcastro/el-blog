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


function App() {
  /*
  const [users, setUsers] = useState([]);
  const [album, setAlbum] = useState([]);
  const [photos, setPhotos] = useState([]);
  const urlUsers = 'https://jsonplaceholder.typicode.com/users';
  const urlAlbums = 'https://jsonplaceholder.typicode.com/albums';
  const urlPhotos = 'https://jsonplaceholder.typicode.com/photos';
  */
  const [users, setUsers] = useState([]);

  const setUser = (params) => {
    setUsers(params);
  }

  return (
    <div >
      <Router>
        <Header />
        <Routes>
        <Route exact path="/" element={<Login setUser={setUser} />}/>
        <Route exact path="/dashboard" element={<Dashboard />}/>
        <Route exact path="/myphotos" element={<Photos />}/>
        <Route exact path="/myphotos/:idPhoto" element={<ImageModal />}/>
        <Route exact path="*" element={<NotFound />}/>

        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
