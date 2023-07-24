import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import rigoImageUrl from "../../img/rigo-baby.jpg";
import { Context } from '../store/appContext';

export const Private = () => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate()

    useEffect(() => {
        store.token == null ? navigate('/login') : null
    }, [store.token])

    return (
        <div className='container-fluid w-50'>
            <div className="card">
                <img src={rigoImageUrl} className="card-img-top w-75 mx-auto" alt="Rigo" />
                <div className="card-body">
                    <h5 className="card-title">Just for your eyes</h5>
                    <p className="card-text">Your token is: {store.token} Remember it is valid just for 24 hours</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item" onClick={e => actions.getUserId()}><Link>Click to ask to the server your user id</Link></li>
                </ul>
                <div className="card-body">
                    <Link to="/" className="card-link">Return to Home</Link>
                </div>
            </div>

        </div>
    )

}