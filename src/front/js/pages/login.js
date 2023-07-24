import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()

    return (
        <div className="container-fluid card w-50 mt-3">
            <div className="card-body">
                <h5 className="card-title">Login</h5>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    actions.login({ email, password })
                    setTimeout(() => {
                        navigate('/login')
                    }, 3000);
                }}>
                    <div className="m-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <div id="emailHelp" className="form-text">Never share your email.</div>
                    </div>
                    <div className="m-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary m-3">Submit</button>
                </form>
            </div>
        </div>
    )
}
