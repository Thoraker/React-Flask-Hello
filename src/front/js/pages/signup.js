import React, { useContext, useState } from 'react';
import { Context } from "../store/appContext";



export const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { store, actions } = useContext(Context);

    return (
        <div className="container-fluid card w-50 mt-3">
            <div className="card-body">
                <h5 class="card-title">Regístrate</h5>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    actions.register({ email, password })
                }}>
                    <div className="m-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <div id="emailHelp" className="form-text">Nunca compartas tu correo con nadie.</div>
                    </div>
                    <div className="m-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary m-3">Submit</button>
                </form>
            </div>
        </div>
    )
}