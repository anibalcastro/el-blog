import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Photos from './components/Photos/Photos';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



function App() {
  return (
    <div >
      <Router>
        <Header />
        <Routes>
        <Route exact path="/" element={<Login />}/>
        <Route exact path="/dashboard" element={<Dashboard />}/>
        <Route exact path="/myphotos" element={<Photos />}/>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
