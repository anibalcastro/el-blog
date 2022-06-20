import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
//import Photos from './components/Photos/Photos';


function App() {
  return (
    <div >
      <Header/>
        <Login />
      <Footer/>
    </div>
  );
}

export default App;
