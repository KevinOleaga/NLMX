import axios from "axios"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import './assets/css/login.css';
import 'bootstrap/dist/css/bootstrap.css';

function Login() {

    const history = useNavigate();
    const MySwal = withReactContent(Swal)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function submit(e) {
        e.preventDefault();

        try {
            if (email === "" || password === "") {
                MySwal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Por favor, complete el formulario correctamente'
                })
            } else {
                await axios.post("http://127.0.0.1:8000/login", {
                    email, password
                })
                    .then(res => {
                        if (res.data === "exist") {
                            history("/home", { state: { id: email } })
                        } else if (res.data === "not exist") {
                            MySwal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Credenciales incorrectas'
                            })
                            var inputEmail = document.getElementById("inputEmail");
                            var inputPassword = document.getElementById("inputPassword");
                            inputEmail.value = "";
                            inputPassword.value = "";
                        }
                    })
                    .catch(e => {
                        MySwal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Ha ocurrido un error, contacta al administrador para solventarlo'
                        })
                        console.log(e);
                    })
            }
        } catch {
            console.log(e);
        }
    }

    return (
        <div className="container-fluid">
            <div className="row no-gutter">
                <div className="col-md-6 d-none d-md-flex bg-image"></div>
                <div className="col-md-6 bg-light">
                    <div className="login d-flex align-items-center py-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-10 col-xl-7 mx-auto">
                                    <h3 className="display-4" id="left">Bienvenido!</h3>
                                    <p className="text-muted mb-4" id="left">Digite sus credenciales</p>
                                    <form action="POST">
                                        <div className="form-group mb-3">
                                            <input type="text" autocomplete="off" onChange={(e) => { setEmail(e.target.value) }} placeholder="Usuario" required="" autofocus="" name="" id="inputEmail" className="form-control rounded-pill border-0 shadow-sm px-4" />
                                        </div>
                                        <div className="form-group mb-4">
                                            <input type="password" autocomplete="off" onChange={(e) => { setPassword(e.target.value) }} placeholder="Contraseña" required="" name="" id="inputPassword" className="form-control rounded-pill border-0 shadow-sm px-4 text-primary" />
                                        </div>
                                        <div className="form-group mb-4">
                                            <button type="submit" onClick={submit} className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill button_custom">Iniciar sesi&oacute;n</button>
                                            <Link className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill button_custom btn_c" to="/signup">Crear usuario</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login