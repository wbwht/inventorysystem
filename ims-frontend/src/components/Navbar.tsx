import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function Navbar() {

    return (
        <header>
            <div className="container-fluid position-relative no-side-padding">
                <span className="logo">
                <img src={require('../assets/logo.png')} alt="My Avatar" />
                </span>

                <div className="menu-nav-icon" data-nav-menu="#main-menu">
                    <i className="ion-navicon" />
                </div>

                <ul className="main-menu visible-on-click" id="main-menu">
                    <li><Link className={"nav-link"} to={"/"}> Nest React TypeScript Inventory/Product Management System </Link></li>
                    <li>
                    </li>
                    <li><Link className={"nav-link"} to={"/"}> Home </Link></li>
                    {/* {isAuthenticated && ( */}
                    <li><Link className={"nav-link"} to={"/create"}> Create </Link></li>
                    {/* )} */}
                </ul>
            </div>
        </header>
    );
}

export default withRouter(Navbar);