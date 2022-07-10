import React, { useEffect, useState, useCallback } from 'react';
import "./Login.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';



function Login() {
    const [users, setUsers] = useState([]);
    const urlUsers = 'https://jsonplaceholder.typicode.com/users';

    //https://stackoverflow.com/questions/55757761/handle-an-input-with-react-hooks
    const [inputValues, setInputValues] = useState({
        username: '', password: ''
    });

    const handleOnChange = useCallback(event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });
    });

    const isLogged = () => {
        const user = JSON.parse(window.localStorage.getItem('UserLogged'));
        if (user) {
            window.location = ('/dashboard');
        }
    }

    //UseEffect
    useEffect(() => {
        document.title = 'El Blog - Login';
        isLogged();
        axios.get(urlUsers)
            .then(res => {
                //Data
                const response = res.data;
                setUsers(response);
                console.log('users: ', response);
                console.log('state: ', users);
            });
        //}
    }, []);




    const iniciarSesion = () => {
        let dataEncontrada = false;
        console.log(users);
        console.log(inputValues.username);
        console.log(inputValues.password);
        for (let x in users) {
            if (((users[x].username === inputValues.username) || (users[x].email === inputValues.username)) && (users[x].address.zipcode === inputValues.password)) {
                console.log('Datos Correctos')
                alert(`Bienvenido ${users[x].name}`);
                let json = {
                    id: users[x].id,
                    name: users[x].name,
                    username: users[x].username,
                    email: users[x].email
                }
                localStorage.setItem('UserLogged', JSON.stringify(json));
                dataEncontrada = true;
                document.getElementById('formLogin').reset();
                window.location.href = "./dashboard/navigator";
                break;
            }
        }

        if (!dataEncontrada) {
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
