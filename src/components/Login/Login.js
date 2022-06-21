import React, { useEffect, useState, useCallback } from 'react';
import "./Login.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Cookie from 'universal-cookie';



function Login() {
    const cookies = new Cookie();
    const [data, setData] = useState([]);

    //https://stackoverflow.com/questions/55757761/handle-an-input-with-react-hooks
    const [inputValues, setInputValues] = useState({
        username: '', password: ''
    });

    const handleOnChange = useCallback(event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });
    });

    //UseEffect
    useEffect(() => {
        document.title = 'El Blog - Login';
        if (cookies.get('id')) {
            window.location.href = "./dashboard";
        }
        else {
            axios.get('https://jsonplaceholder.typicode.com/users')
                .then(res => {
                    //Data
                    const response = res.data;
                    setData(response);
                    console.log('data: ', response);
                    console.log('state: ', data);
                });
        }
    }, []);



    const iniciarSesion = () => {
        let dataEncontrada = false;
        console.log(data);
        console.log(inputValues.username);
        console.log(inputValues.password);
        for (let x in data) {
            if (((data[x].username === inputValues.username) || (data[x].email === inputValues.username)) && (data[x].address.zipcode === inputValues.password)) {
                console.log('Datos Correctos')
                alert(`Bienvenido ${data[x].name}`);
                cookies.set('id', data[x].id, { path: "/" });
                cookies.set('name', data[x].name, { path: "/" });
                cookies.set('username', data[x].username, { path: "/" });
                cookies.set('email', data[x].email, { path: "/" });
                cookies.set('adress', data[x].adress, { path: "/" });
                cookies.set('phone', data[x].phone, { path: "/" });
                cookies.set('website', data[x].website, { path: "/" });
                window.location.href = "./dashboard";
                dataEncontrada = true;
                document.getElementById('formLogin').reset();
                break;
            }
        }

        if(!dataEncontrada){
            alert('Error, datos ingresados, no coinciden.');
            document.getElementById('formLogin').reset();
        }

    }

    return (
        <React.Fragment>

                <div className="wrapper fadeInDown">
                    <div id="formContent">
                        <div className="fadeIn first">
                            <h4 className='title'>Login</h4>
                        </div>
                        <form id='formLogin'>
                            <input onChange={handleOnChange} type="text" id="login" className="fadeIn second" name="username" placeholder="User or email" ></input>
                            <input onChange={handleOnChange} type="password" id="current-password" autoComplete='on' className="fadeIn third" name="password" placeholder="Your password" ></input>
                        </form>
                        <input onClick={() => iniciarSesion()} type="submit" className="fadeIn fourth" value="Log In"></input>
                    </div>
                </div>
        </React.Fragment>
    );
}

export default Login;
