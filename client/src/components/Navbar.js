import React from 'react';
import {Link, Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../actions/authAction";

const Navbar = () => {
    const dispatch = useDispatch();
    const {isAuthenticated} = useSelector(state => state.authReducer);

    const logoutHandler = () => {
        dispatch(logout());
        return <Redirect to='/' />
    };

    return (
        //Top nav bar
        <>
            <div className='iq-top-navbar'>
                <div className='iq-navbar-custom'>
                    <nav className='navbar navbar-expand-lg navbar-light p-0'>
                        <div className='iq-navbar-logo d-flex justify-content-between'>
                            <Link to='/'>
                                <div>Watching.Social</div>
                            </Link>
                            <div className="iq-menu-bt align-self-center">
                                <div className="wrapper-menu">
                                    <div className="main-circle"><i className="ri-menu-line"/></div>
                                </div>
                            </div>
                        </div>
                        <div className='iq-search-bar'>
                            <form action="#" className="searchbox">
                                <input type="text" className="text search-input"
                                       placeholder="Search for people, shows or comments"/>
                                <div className="search-link"><i className="ri-search-line"/></div>
                            </form>
                        </div>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-label="Toggle navigation">
                            <i className="ri-menu-3-line"/>
                        </button>
                        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                            <ul className="navbar-nav ml-auto navbar-list">
                                <li>
                                    <Link to={'/profile'} className='iq-waves-effect d-flex align-items-center'>
                                        <img
                                            src='https://i.pinimg.com/originals/a3/9d/e1/a39de166cf1b83d8438a6f1b86279604.png'
                                            className='img-fluid rounded-circle mr-3' alt="user"/>
                                        <div className='caption'>
                                            <h6 className="mb-0 line-height">Your Name</h6>
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/" className="iq-waves-effect d-flex align-items-center">
                                        <i className="ri-home-line"/>
                                    </Link>
                                </li>
                                <li className='nav-item'>
                                    <Link to='/friends' className='search-toggle iq-waves-effect'>
                                        <i className="ri-group-line"/>
                                    </Link>
                                </li>
                                {isAuthenticated &&
                                <li className='nav-item'>
                                    <a onClick={logoutHandler} className='search-toggle iq-waves-effect'>
                                        <i className="ri-login-box-line ml-2"/>
                                    </a>
                                </li>
                                }
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Navbar;