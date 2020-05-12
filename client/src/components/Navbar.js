import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../actions/authAction";
import {Button, Collapse} from 'reactstrap';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const {isAuthenticated} = useSelector(state => state.authReducer);

    const toggle = () => setIsOpen(!isOpen);

    const logoutHandler = () => {
        dispatch(logout());
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
                        <Button className="navbar-toggler" onClick={toggle}
                                aria-label="Toggle navigation">
                            <i className="ri-menu-3-line"/>
                        </Button>
                        <Collapse isOpen={isOpen} className='collapse navbar-collapse'>
                                    <div id='navbarSupportedContent'>
                                        <ul className="navbar-nav ml-auto navbar-list">
                                            <li>
                                                <Link to={'/profile'}
                                                      className='iq-waves-effect d-flex align-items-center'>
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
                                            {isAuthenticated ?
                                                <li className='nav-item'>
                                                    <Link to={'/'} onClick={logoutHandler}
                                                       className='search-toggle iq-waves-effect'>
                                                        Logout<i className="ri-logout-box-line ml-2"/>
                                                    </Link>
                                                </li>
                                                :
                                                <li className='nav-item'>
                                                    <Link to='/auth' className='search-toggle iq-waves-effect'>
                                                        Login<i className="ri-login-box-fill ml-2"/>
                                                    </Link>
                                                </li>
                                            }
                                        </ul>
                                    </div>
                        </Collapse>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Navbar;