import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../actions/authAction";
import {Button, Collapse} from 'reactstrap';

const Navbar = () => {
    const [topNavbarIsOpen, setTopNavbarIsOpen] = useState(false);
    const [sideNavbarIsOpen, setSideNavbarIsOpen] = useState(true);
    const [rightNavbarClasses, setRightNavbarClasses] = useState("right-sidebar-mini");
    const dispatch = useDispatch();
    const {isAuthenticated} = useSelector(state => state.authReducer);

    const toggleTopNavbar = () => setTopNavbarIsOpen(!topNavbarIsOpen);

    const toggleSideNavbar = () => {
        setSideNavbarIsOpen(!sideNavbarIsOpen);
        if (!sideNavbarIsOpen) {
            document.body.classList.add('sidebar-main');
        } else {
            document.body.classList.remove('sidebar-main');
        }
    };

    const toggleRightSideNavBar = () => {
        if (rightNavbarClasses.includes("right-sidebar-mini right-sidebar")) {
            setRightNavbarClasses("right-sidebar-mini");
            document.body.classList.remove("right-sidebar-close");
        } else {
            setRightNavbarClasses("right-sidebar-mini right-sidebar");
            document.body.classList.add("right-sidebar-close");
        }
    };

    const logoutHandler = () => {
        dispatch(logout());
    };

    return (
        //Top nav bar
        <div className='wrapper'>
            <div className='iq-top-navbar'>
                <div className='iq-navbar-custom'>
                    <nav className='navbar navbar-expand-lg navbar-light p-0'>
                        <div className='iq-navbar-logo d-flex justify-content-between'>
                            <Link to='/'>
                                <div>Watching.Social</div>
                            </Link>
                            <div className="iq-menu-bt align-self-center" onClick={toggleSideNavbar}>
                                <div className="wrapper-menu">
                                    <div className="main-circle"><i className="ri-menu-line" /></div>
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
                        <Button className="navbar-toggler" onClick={toggleTopNavbar}
                                aria-label="Toggle navigation">
                            <i className="ri-menu-3-line"/>
                        </Button>
                        <Collapse isOpen={topNavbarIsOpen} className='collapse navbar-collapse'>
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

            {/*todo: Refactor to new component*/}
            {/*Right Navbar*/}
            <div className={rightNavbarClasses}>
                <div className="right-sidebar-panel p-0">
                    <div className="iq-card shadow-none">
                        <div className="iq-card-body p-0">
                            <div className="media-height p-3">
                                <div className="media align-items-center mb-4">
                                    <div className="iq-profile-avatar status-online">
                                        <img className="rounded-circle avatar-50" src="images/user/03.jpg" alt=""/>
                                    </div>
                                    <div className="media-body ml-3">
                                        <h6 className="mb-0"><a href="#">Greta Life</a></h6>
                                        <p className="mb-0">Admin</p>
                                    </div>
                                </div>
                                <div className="media align-items-center mb-4">
                                    <div className="iq-profile-avatar status-away">
                                        <img className="rounded-circle avatar-50" src="images/user/12.jpg" alt=""/>
                                    </div>
                                    <div className="media-body ml-3">
                                        <h6 className="mb-0"><a href="#">Ira Membrit</a></h6>
                                        <p className="mb-0">Admin</p>
                                    </div>
                                </div>
                                <div className="media align-items-center mb-4">
                                    <div className="iq-profile-avatar status-away">
                                        <img className="rounded-circle avatar-50" src="images/user/01.jpg" alt=""/>
                                    </div>
                                    <div className="media-body ml-3">
                                        <h6 className="mb-0"><a href="#">Pete Sariya</a></h6>
                                        <p className="mb-0">Admin</p>
                                    </div>
                                </div>
                                <div className="media align-items-center">
                                    <div className="iq-profile-avatar">
                                        <img className="rounded-circle avatar-50" src="images/user/02.jpg" alt=""/>
                                    </div>
                                    <div className="media-body ml-3">
                                        <h6 className="mb-0"><a href="#">Monty Carlo</a></h6>
                                        <p className="mb-0">Admin</p>
                                    </div>
                                </div>
                            </div>
                            <div className="right-sidebar-toggle bg-primary mt-3" onClick={toggleRightSideNavBar}>
                                <i className="ri-arrow-left-line side-left-icon" />
                                <i className="ri-arrow-right-line side-right-icon"><span
                                    className="ml-3 d-inline-block">Close Menu</span></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*todo: Refactor to new component*/}
            {/*Side Navbar*/}
                <div className="iq-sidebar">
                    <div id="sidebar-scrollbar">
                        <nav className="iq-sidebar-menu">
                            <ul id="iq-sidebar-toggle" className="iq-menu">
                                <li className="active">
                                    <a href="index.html" className="iq-waves-effect"><i
                                        className="las la-newspaper"/><span>Newsfeed</span></a>
                                </li>
                                <li>
                                    <a href="profile.html" className="iq-waves-effect"><i
                                        className="las la-user"></i><span>Profile</span></a>
                                </li>
                                <li>
                                    <a href="friend-list.html" className="iq-waves-effect"><i
                                        className="las la-user-friends"></i><span>Friend Lists</span></a>
                                </li>
                                <li>
                                    <a href="group.html" className="iq-waves-effect"><i
                                        className="las la-users"></i><span>Group</span></a>
                                </li>
                                <li>
                                    <a href="profile-images.html" className="iq-waves-effect"><i
                                        className="las la-image"></i><span>Profile Image</span></a>
                                </li>
                                <li>
                                    <a href="profile-video.html" className="iq-waves-effect"><i
                                        className="las la-video"></i><span>Profile Video</span></a>
                                </li>
                                <li>
                                    <a href="profile-event.html" className="iq-waves-effect"><i
                                        className="las la-film"></i><span>Profile Events</span></a>
                                </li>
                                <li>
                                    <a href="notification.html" className="iq-waves-effect"><i
                                        className="las la-bell"></i><span>Notification</span></a>
                                </li>
                                <li>
                                    <a href="file.html" className="iq-waves-effect"><i
                                        className="las la-file"></i><span>Files</span></a>
                                </li>
                                <li>
                                    <a href="friend-request.html" className="iq-waves-effect"><i
                                        className="las la-anchor"></i><span>Friend Request</span></a>
                                </li>
                                <li>
                                    <a href="chat.html" className="iq-waves-effect"><i
                                        className="lab la-rocketchat"></i><span>Chat</span></a>
                                </li>
                                <li>
                                    <a href="todo.html" className="iq-waves-effect"><i
                                        className="las la-check-circle"></i><span>Todo</span></a>
                                </li>
                                <li>
                                    <a href="calendar.html" className="iq-waves-effect"><i
                                        className="las la-calendar"></i><span>Calendar</span></a>
                                </li>
                                <li>
                                    <a href="birthday.html" className="iq-waves-effect"><i
                                        className="las la-birthday-cake"></i><span>Birthday</span></a>
                                </li>
                                <li>
                                    <a href="weather.html" className="iq-waves-effect"><i
                                        className="ri-snowy-line"></i><span>Weather</span></a>
                                </li>
                                <li>
                                    <a href="music.html" className="iq-waves-effect"><i
                                        className="ri-play-circle-line"></i><span>Music</span></a>
                                </li>
                                <li>
                                    <a href="#mailbox" className="iq-waves-effect collapsed" data-toggle="collapse"
                                       aria-expanded="false"><i className="ri-mail-line"></i><span>Email</span><i
                                        className="ri-arrow-right-s-line iq-arrow-right"></i></a>
                                    <ul id="mailbox" className="iq-submenu collapse" data-parent="#iq-sidebar-toggle">
                                        <li><a href="app/index.html"><i className="ri-inbox-line"></i>Inbox</a></li>
                                        <li><a href="app/email-compose.html"><i className="ri-edit-line"></i>Email
                                            Compose</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#ui-elements" className="iq-waves-effect collapsed" data-toggle="collapse"
                                       aria-expanded="false"><i className="ri-focus-2-line"></i><span>Ui-Elements</span><i
                                        className="ri-arrow-right-s-line iq-arrow-right"></i></a>
                                    <ul id="ui-elements" className="iq-submenu collapse"
                                        data-parent="#iq-sidebar-toggle">
                                        <li>
                                            <a href="#ui-kit" className="iq-waves-effect collapsed"
                                               data-toggle="collapse"
                                               aria-expanded="false"><i
                                                className="ri-pencil-ruler-line"></i><span>UI Kit</span><i
                                                className="ri-arrow-right-s-line iq-arrow-right"></i></a>
                                            <ul id="ui-kit" className="iq-submenu collapse" data-parent="#ui-elements">
                                                <li><a href="ui-colors.html"><i className="ri-font-color"></i>colors</a>
                                                </li>
                                                <li><a href="ui-typography.html"><i
                                                    className="ri-text"></i>Typography</a>
                                                </li>
                                                <li><a href="ui-alerts.html"><i className="ri-alert-line"></i>Alerts</a>
                                                </li>
                                                <li><a href="ui-badges.html"><i
                                                    className="ri-building-3-line"></i>Badges</a></li>
                                                <li><a href="ui-breadcrumb.html"><i className="ri-menu-2-line"></i>Breadcrumb</a>
                                                </li>
                                                <li><a href="ui-buttons.html"><i className="ri-checkbox-blank-line"></i>Buttons</a>
                                                </li>
                                                <li><a href="ui-cards.html"><i
                                                    className="ri-bank-card-line"></i>Cards</a>
                                                </li>
                                                <li><a href="ui-carousel.html"><i className="ri-slideshow-line"></i>Carousel</a>
                                                </li>
                                                <li><a href="ui-embed-video.html"><i
                                                    className="ri-slideshow-2-line"></i>Video</a>
                                                </li>
                                                <li><a href="ui-grid.html"><i className="ri-grid-line"></i>Grid</a></li>
                                                <li><a href="ui-images.html"><i className="ri-image-line"></i>Images</a>
                                                </li>
                                                <li><a href="ui-list-group.html"><i className="ri-file-list-3-line"></i>list
                                                    Group</a></li>
                                                <li><a href="ui-media-object.html"><i
                                                    className="ri-camera-line"></i>Media</a></li>
                                                <li><a href="ui-modal.html"><i
                                                    className="ri-stop-mini-line"></i>Modal</a>
                                                </li>
                                                <li><a href="ui-notifications.html"><i
                                                    className="ri-notification-line"></i>Notifications</a>
                                                </li>
                                                <li><a href="ui-pagination.html"><i className="ri-pages-line"></i>Pagination</a>
                                                </li>
                                                <li><a href="ui-popovers.html"><i
                                                    className="ri-folder-shield-2-line"></i>Popovers</a>
                                                </li>
                                                <li><a href="ui-progressbars.html"><i
                                                    className="ri-battery-low-line"></i>Progressbars</a>
                                                </li>
                                                <li><a href="ui-tabs.html"><i className="ri-database-line"></i>Tabs</a>
                                                </li>
                                                <li><a href="ui-tooltips.html"><i className="ri-record-mail-line"></i>Tooltips</a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="#forms" className="iq-waves-effect collapsed"
                                               data-toggle="collapse"
                                               aria-expanded="false"><i
                                                className="ri-profile-line"></i><span>Forms</span><i
                                                className="ri-arrow-right-s-line iq-arrow-right"></i></a>
                                            <ul id="forms" className="iq-submenu collapse" data-parent="#ui-elements">
                                                <li><a href="form-layout.html"><i className="ri-tablet-line"></i>Form
                                                    Elements</a></li>
                                                <li><a href="form-validation.html"><i className="ri-device-line"></i>Form
                                                    Validation</a></li>
                                                <li><a href="form-switch.html"><i className="ri-toggle-line"></i>Form
                                                    Switch</a>
                                                </li>
                                                <li><a href="form-chechbox.html"><i className="ri-checkbox-line"></i>Form
                                                    Checkbox</a></li>
                                                <li><a href="form-radio.html"><i className="ri-radio-button-line"></i>Form
                                                    Radio</a></li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="#wizard-form" className="iq-waves-effect collapsed"
                                               data-toggle="collapse" aria-expanded="false"><i
                                                className="ri-archive-drawer-line"></i><span>Forms Wizard</span><i
                                                className="ri-arrow-right-s-line iq-arrow-right"></i></a>
                                            <ul id="wizard-form" className="iq-submenu collapse"
                                                data-parent="#ui-elements">
                                                <li><a href="form-wizard.html"><i className="ri-clockwise-line"></i>Simple
                                                    Wizard</a></li>
                                                <li><a href="form-wizard-validate.html"><i
                                                    className="ri-clockwise-2-line"></i>Validate Wizard</a></li>
                                                <li><a href="form-wizard-vertical.html"><i
                                                    className="ri-anticlockwise-line"></i>Vertical Wizard</a></li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="#tables" className="iq-waves-effect collapsed"
                                               data-toggle="collapse"
                                               aria-expanded="false"><i className="ri-table-line"></i><span>Table</span><i
                                                className="ri-arrow-right-s-line iq-arrow-right"></i></a>
                                            <ul id="tables" className="iq-submenu collapse" data-parent="#ui-elements">
                                                <li><a href="tables-basic.html"><i className="ri-table-line"></i>Basic
                                                    Tables</a></li>
                                                <li><a href="data-table.html"><i className="ri-database-line"></i>Data
                                                    Table</a>
                                                </li>
                                                <li><a href="table-editable.html"><i className="ri-refund-line"></i>Editable
                                                    Table</a></li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="#icons" className="iq-waves-effect collapsed"
                                               data-toggle="collapse"
                                               aria-expanded="false"><i className="ri-list-check"></i><span>Icons</span><i
                                                className="ri-arrow-right-s-line iq-arrow-right"></i></a>
                                            <ul id="icons" className="iq-submenu collapse" data-parent="#ui-elements">
                                                <li><a href="icon-dripicons.html"><i className="ri-stack-line"></i>Dripicons</a>
                                                </li>
                                                <li><a href="icon-fontawesome-5.html"><i
                                                    className="ri-facebook-fill"></i>Font
                                                    Awesome 5</a></li>
                                                <li><a href="icon-lineawesome.html"><i className="ri-keynote-line"></i>line
                                                    Awesome</a></li>
                                                <li><a href="icon-remixicon.html"><i className="ri-remixicon-line"></i>Remixicon</a>
                                                </li>
                                                <li><a href="icon-unicons.html"><i className="ri-underline"></i>unicons</a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#pages" className="iq-waves-effect collapsed" data-toggle="collapse"
                                       aria-expanded="false"><i className="ri-pages-line"></i><span>Pages</span><i
                                        className="ri-arrow-right-s-line iq-arrow-right"></i></a>
                                    <ul id="pages" className="iq-submenu collapse" data-parent="#iq-sidebar-toggle">
                                        <li>
                                            <a href="#authentication" className="iq-waves-effect collapsed"
                                               data-toggle="collapse" aria-expanded="false"><i
                                                className="ri-pages-line"></i><span>Authentication</span><i
                                                className="ri-arrow-right-s-line iq-arrow-right"></i></a>
                                            <ul id="authentication" className="iq-submenu collapse"
                                                data-parent="#pages">
                                                <li><a href="sign-in.html"><i
                                                    className="ri-login-box-line"></i>Login</a>
                                                </li>
                                                <li><a href="sign-up.html"><i className="ri-login-circle-line"></i>Register</a>
                                                </li>
                                                <li><a href="pages-recoverpw.html"><i
                                                    className="ri-record-mail-line"></i>Recover
                                                    Password</a></li>
                                                <li><a href="pages-confirm-mail.html"><i
                                                    className="ri-file-code-line"></i>Confirm
                                                    Mail</a></li>
                                                <li><a href="pages-lock-screen.html"><i className="ri-lock-line"></i>Lock
                                                    Screen</a></li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="#extra-pages" className="iq-waves-effect collapsed"
                                               data-toggle="collapse" aria-expanded="false"><i
                                                className="ri-pantone-line"></i><span>Extra Pages</span><i
                                                className="ri-arrow-right-s-line iq-arrow-right"></i></a>
                                            <ul id="extra-pages" className="iq-submenu collapse" data-parent="#pages">
                                                <li><a href="pages-timeline.html"><i
                                                    className="ri-map-pin-time-line"></i>Timeline</a>
                                                </li>
                                                <li><a href="pages-invoice.html"><i
                                                    className="ri-question-answer-line"></i>Invoice</a>
                                                </li>
                                                <li><a href="blank-page.html"><i className="ri-invision-line"></i>Blank
                                                    Page</a>
                                                </li>
                                                <li><a href="pages-error.html"><i className="ri-error-warning-line"></i>Error
                                                    404</a></li>
                                                <li><a href="pages-error-500.html"><i
                                                    className="ri-error-warning-line"></i>Error
                                                    500</a></li>
                                                <li><a href="pages-pricing.html"><i className="ri-price-tag-line"></i>Pricing</a>
                                                </li>
                                                <li><a href="pages-pricing-one.html"><i
                                                    className="ri-price-tag-2-line"></i>Pricing
                                                    1</a></li>
                                                <li><a href="pages-maintenance.html"><i className="ri-archive-line"></i>Maintenance</a>
                                                </li>
                                                <li><a href="pages-comingsoon.html"><i
                                                    className="ri-mastercard-line"></i>Coming
                                                    Soon</a></li>
                                                <li><a href="pages-faq.html"><i
                                                    className="ri-compasses-line"></i>Faq</a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>

                            </ul>
                        </nav>
                        <div className="p-3"/>
                    </div>
                </div>
        </div>
    );
};

export default Navbar;