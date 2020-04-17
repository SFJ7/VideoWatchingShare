import React from 'react';
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <div className='iq-top-navbar'>
            <div className='iq-navbar-custom'>
                <nav className='navbar navbar-expand-lg navbar-light p-0'>
                    <div className='iq-navbar-logo d-flex justify-content-between'>
                        <Link to={'/'}>
                            <div>Placeholder</div>
                        </Link>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;