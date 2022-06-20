import React from "react";
import "./Footer.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTwitter, FaFacebook, FaGoogle, FaYoutube } from 'react-icons/fa';

//import {  } from '@fortawesome/free-solid-svg-icons'


function Footer() {

    return (
        <React.Fragment >
                <footer className="text-center text-lg-start" >
                    <div className="container d-flex justify-content-center py-5">
                        <button type="button" className="btn btn-dark btn-lg btn-floating mx-2">
                        <FaTwitter/>
                        </button>
                        <button type="button" className="btn btn-dark btn-lg btn-floating mx-2">
                        <FaFacebook />
                        </button>
                        <button type="button" className="btn btn-dark btn-lg btn-floating mx-2">
                        <FaGoogle/>
                        </button>
                        <button type="button" className="btn btn-dark btn-lg btn-floating mx-2">
                        <FaYoutube />
                        </button>
                    </div>

                    
                    <div id='contCopyright' className="text-center text-white p-3">
                        © 2022 Copyright:
                        <a className="text-white" href="https://mdbootstrap.com/"> Blog.com</a>
                    </div>
                    
                </footer>
        </React.Fragment>);
}

export default Footer;