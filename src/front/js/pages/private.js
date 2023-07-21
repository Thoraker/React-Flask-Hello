import React from 'react';
import { Link } from 'react-router-dom';
import rigoImageUrl from "../../img/rigo-baby.jpg";

export const Private = () => {
    return (
        <div className='container-fluid w-50'>
            <div className="card">
                <img src={rigoImageUrl} className="card-img-top w-75 mx-auto" alt="Rigo" />
                <div className="card-body">
                    <h5 className="card-title">Just for your eyes</h5>
                    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus porttitor turpis aliquet, placerat elit venenatis, ultricies turpis. Sed pharetra eu nulla non ornare. Sed lacinia justo in efficitur porttitor. Sed.</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Lorem Ipsum</li>
                    <li className="list-group-item">Lorem Picsum</li>
                </ul>
                <div className="card-body">
                    <Link to="/" className="card-link">Return to Home</Link>
                </div>
            </div>

        </div>
    )

}