import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context)
	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary px-3">
			<div className="container-fluid">
				<Link className="navbar-brand" to="/">React Boilerplate</Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link className="nav-link active" aria-current="page" to="/signup">Register</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/login">Login</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/private">Private</Link>
						</li>
						<li className="nav-item dropdown">
							<Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
								Logout
							</Link>
							<ul className="dropdown-menu">
								<li><span className="dropdown-item" onClick={e => actions.logout()}>Logout</span></li>
							</ul>
						</li>
					</ul>
					<span className={store.token != null ? "nav-link text-success" : "nav-link text-danger"}>{store.token != null ? "Logged" : "Not Logged"}</span>
				</div>
			</div>
		</nav >
	);
};
