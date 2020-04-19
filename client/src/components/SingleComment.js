import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {addComment} from "../actions/commentsAction";

const SingleComment = () => {
    const authState = useSelector(state => state.authReducer);

    const [formData, setFormData] = useState({
        text: '',
        show: '',
        episode: '',
        season: ''
    })

    const dispatch = useDispatch();

    const formDataChangeHandler = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    };

    const submitCommentHandler = () => {
        console.log(JSON.stringify(formData));
        dispatch(addComment(formData));
    };

    return (
        <>
            {authState.isAuthenticated &&
            <div className="col-sm-12">
                <div id="post-modal-data" className="iq-card iq-card-block iq-card-stretch iq-card-height">
                    <div className="iq-card-header d-flex justify-content-between">
                        <div className="iq-header-title">
                            <h4 className="card-title">Comment on What You're Watching</h4>
                        </div>
                    </div>
                    <div className="iq-card-body" data-toggle="modal" data-target="#post-modal">
                        <div className="d-flex align-items-center">
                            <div className="user-img">
                                <Link
                                    // ${authState.user._id}
                                    to={`/profile/`}>
                                    <img className='avatar-60 rounded-circle'
                                         src='https://i.pinimg.com/originals/a3/9d/e1/a39de166cf1b83d8438a6f1b86279604.png'
                                         alt='profile'/>
                                </Link>
                            </div>
                            <div className='post-text ml-3 w-100'>
                                <textarea className='form-control rounded' name='text'
                                       placeholder='Write something about the show'
                                       onChange={event => formDataChangeHandler(event)}/>
                            </div>
                        </div>
                        <hr/>
                        <div className='post-opt-block d-flex align-items-center list-inline m-0 p-0'>
                            <input className='form-control rounded' name='show' type='text'
                                   placeholder='Show Name' onChange={event => formDataChangeHandler(event)}/>
                        </div>
                            <div className='post-opt-block d-flex align-items-center list-inline m-0 p-0'>
                            <input className='form-control rounded' name='season' type='number' min={0}
                                   placeholder='Season (0 if no season)'
                                   onChange={event => formDataChangeHandler(event)}/>
                            </div>
                        <div className='post-opt-block d-flex align-items-center list-inline m-0 p-0'>
                            <input className='form-control rounded' name='episode' type='number' min={0}
                                   placeholder='Episode Number (0 if no episode)'
                                   onChange={event => formDataChangeHandler(event)}/>
                        </div>
                            <button type='button' className='btn btn-primary'
                                    onClick={() => submitCommentHandler()}>Comment
                            </button>

                    </div>
                </div>
            </div>
            }
        </>
);
};

export default SingleComment;