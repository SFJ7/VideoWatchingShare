import React, {useEffect, useState} from 'react';
import Navbar from "./Navbar";
import {useDispatch, useSelector} from "react-redux";
import {getComments, getCommentsAll, likeOrUnlike} from "../actions/commentsAction";
import {Link} from "react-router-dom";
import Moment from "react-moment";
import SingleComment from "./SingleComment";

const Feed = () => {
    const dispatch = useDispatch();

    // const [subComments, setSubComments] = useState([]);
    const {isAuthenticated, user} = useSelector(state => state.authReducer);
    const {comments, loading} = useSelector(state => state.commentsReducer);

    useEffect(() => {
        isAuthenticated ? dispatch(getCommentsAll()) : dispatch(getComments());
    }, [
        dispatch,
        isAuthenticated
    ])

    const renderCommentComments = (subComment) => {
        return subComment.map(subComment => {
            return (
                <li key={subComment._id} className='mb-2'>
                    <div className='d-flex flex-wrap'>
                        <div className='user-img'>
                            <Link
                            to={`/profile/${subComment.user}`}>
                            <img className='avatar-35 rounded-circle img-fluid'
                                 src='https://i.pinimg.com/originals/a3/9d/e1/a39de166cf1b83d8438a6f1b86279604.png'
                                 alt='profile'/>
                        </Link>
                        </div>
                        <div className='comment-data-block ml-3'>
                            <h6>{subComment.name}</h6>
                            <div className="d-flex flex-wrap align-items-center comment-activity">
                                <span>Posted: <Moment format='DD/MM/YYYY'>{subComment.date}</Moment></span>
                            </div>
                            <p className='mb-0'>{subComment.text}</p>
                        </div>
                    </div>
                </li>
            )
        })
    }

    const subCommentSubmitHandler = (event, id) => {
        console.log(event);
        console.log(id);
    }

    function likeChangeHandler(event, id) {
        dispatch(likeOrUnlike(id));
    }

    const renderComments = (userId) => {
        if (userId !== null)
            return comments.map(comment => {
                // updateCommentState(comment._id);
                return (
                    <div key={comment._id} className='col-sm-12'>
                        <div className='iq-card iq-card-block iq-card-stretch iq-card-height'>
                            <div className='iq-card-body'>
                                <div className='user-post-data'>
                                    <div className='d-flex flex-wrap'>
                                        <div className='media-support-user-img mr-3'>
                                            <Link
                                                to={`/profile/${comment.user}`}>
                                                <img className='rounded-circle img-fluid'
                                                     src='https://i.pinimg.com/originals/a3/9d/e1/a39de166cf1b83d8438a6f1b86279604.png'
                                                     alt='profile'/>
                                            </Link>
                                        </div>
                                        <div className='media-support-info mt-2'>
                                            <h5 className='mb-0 d-inline-block'>
                                                <Link
                                                to={`/profile/${comment.user}`}>{comment.name}
                                                </Link>
                                            </h5>
                                            <p>Posted: <Moment format='DD/MM/YYYY'>{comment.date}</Moment></p>
                                        </div>
                                    </div>
                                    <div className='mt-3'>
                                        <h5 className='mb-0 d-inline-block'>{comment.text}</h5>
                                        <p className='mb-0 text-primary'>{comment.show}{comment.season ? ` - Season ${comment.season},` : ''}{comment.episode ? ` Episode ${comment.episode}` : ''}</p>
                                    </div>
                                    <div className='comment-area mt-3'>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <div className='like-block position-relative d-flex align-items-center'>
                                                <div className='d-flex align-items-center'>
                                                    <div className='like-data'>
                                                        <div className='dropdown'>
                                                        <span className='dropdown-toggle'>
                                                            {comment.likes.length > 0
                                                                ?
                                                                <i className={comment.likes.filter(like => like.user
                                                                    === userId._id).length > 0 ? 'ri-thumb-up-fill' +
                                                                    ' text-primary' : 'ri-thumb-up-fill'} onClick={event => likeChangeHandler(event, comment._id)}/>
                                                                :
                                                                <i className='ri-thumb-up-fill' onClick={event => likeChangeHandler(event, comment._id)}/>
                                                            }

                                                        </span>
                                                        </div>
                                                    </div>
                                                    <div className='total-like-block ml-2 mr-3'>
                                                        <div className='dropdown'>
                                                        <span className='dropdown-toggle'>
                                                            {comment.likes.length} {comment.likes.length === 1 ? 'Like' : 'Likes'}
                                                        </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='total-comment-block'>
                                                    <div className='dropdown'>
                                                    <span className='dropdown-toggle'>
                                                        {comment.comments.length} {comment.comments.length === 1 ? 'Comment' : 'Comments'}
                                                    </span>
                                                    </div>
                                                </div>
                                                <div className='total-comment-block'>
                                                    <div className='dropdown'>
                                                    <span className='dropdown-toggle'>
                                                        <Link to={`comment/${comment._id}`}><span className='dropdown-toggle'>&nbsp; - View Thread</span></Link>
                                                    </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='share-block d-flex align-items-center feather-icon mr-3'>
                                                <a><i className='ri-share-line'/></a>
                                                <span className='ml-1'>Share</span>
                                            </div>
                                        </div>
                                        <hr/>
                                        <ul className='post-comments p-0 m-0'>
                                            <p className=''>Newest 3 comments</p>
                                            {renderCommentComments(comment.comments.slice(0, 3))}
                                        </ul>
                                        <div className='comment-text d-flex align-items-center mt-3'>
                                            <input type='text'
                                                   // onChange={e => commentChangeHandler(e, comment._id)} value={subComments.filter(subComment => subComment._id === comment._id).subCommentText}
                                                   className='form-control rounded' />
                                            <button type='button' className='btn btn-primary' onClick={e => subCommentSubmitHandler(e, comment._id)}>Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
    };

    return (
        <>
            <Navbar/>
            {/*@todo implement loading*/}
            <div className='container' style={{marginTop: '100px'}}>
                <div className='row'>
                    <div className='col-lg-8 row m-0 p-0'>
                        <SingleComment />
                        {renderComments(user)}
                    </div>
                </div>
            </div>

        </>
    );
};

export default Feed;