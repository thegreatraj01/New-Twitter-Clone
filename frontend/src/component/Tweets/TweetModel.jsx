import React, { useState } from 'react';
import './Tweetmodel.css';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CachedIcon from '@mui/icons-material/Cached';
import formatDistance from "date-fns/formatDistance";
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../Config';
import CONFIG_OBJ from '../../Config';
// import CONFIG_OBJ from '../../Config';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

function TweetModel({ tweet, setTweets }) {
  // console.log(tweet);

  const location = useLocation().pathname


  const user = useSelector(state => state.userReducer.user)
  // console.log(user._id);
  // debugger;


  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState('');

  const dateStr = formatDistance(new Date(tweet.createdAt), new Date());

  const handleCommentClick = () => {
    setShowCommentBox((prevShowCommentBox) => !prevShowCommentBox);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    // You can handle the comment submission logic here, e.g., send it to a server or update your state.
    // Reset the comment box and hide it after submission.
    setComment('');
    setShowCommentBox(false);
  };


  // function for handle like 
  const handlelike = async (e) => {
    e.preventDefault();
    const userid = { userid: user._id }
    try {
      // for like 
      const data = await axios.put(`${BASE_URL}/like/dislike/${tweet._id}`, userid);
      console.log(data)

      if (location.includes("profile")) {
        const newData = await axios.get(`${BASE_URL}/myalltweet`, CONFIG_OBJ);
        setTweets(newData.data);
      } else if (location.includes("explore")) {
        const newData = await axios.get(`${BASE_URL}/exploretweet`, CONFIG_OBJ);
        console.log(newData.data.posts)
        // debugger;
        setTweets(newData.data.posts);
      }

    } catch (error) {
      console.log('Network error:', error.message);
    }
  }



  return (
    <div className="bg-body-tertiary p-3 border border-light-subtle mt-2 m-1">
      {/* first row */}
      <div className="row">
        {/* for image */}
        <div className="col-10 d-flex">
          <img className='rounded-circle bg-primary' src={tweet.tweetedBy.profilePic} alt="profilepic" width="50" height="50" />
          <div className='mt-1'>
            <Link className='fw-semibold fs-5 p-1 cursor-pointer user-underline' to={`/profile/${tweet.tweetedBy._id}`}>@{tweet.tweetedBy.username} </Link>
            <span className='fw-medium p-1'>{dateStr}</span>
          </div>
        </div>

        <div className="col text-end">
          {user._id === tweet.tweetedBy._id && <div className='cursor-pointer'>
            <DeleteIcon />
          </div>}

        </div>
      </div>
      {/* second row  */}
      <div className="row">
        <div className="col-12">
          <p className='ps-5 fw-semibold '>
            {tweet.content}
          </p>
        </div>
        {tweet.image && <div className='col-12'>
          <img className="w-100 rounded img-fluid" src={tweet.image} alt='tweetpic' />
        </div>}

      </div>

      {/* third row */}
      <div className="row mt-3">
        <div className="col-4 text-center cursor-pointer" onClick={handlelike}>
          {tweet.likes.includes(user._id) ? <FavoriteIcon className='text-danger' /> : <FavoriteBorderIcon />}
          <span>{tweet.likes.length} </span>
        </div>
        <div className="col-4 text-center cursor-pointer" onClick={handleCommentClick}>
          <ChatBubbleOutlineIcon />
        </div>
        <div className="col-4 text-center cursor-pointer">
          <CachedIcon /> Retweet
        </div>
        {/* Comment Box */}
        {showCommentBox && (
          <div className="comment-box mt-1 w-100">
            <textarea
              className="w-100"
              rows="3"
              placeholder="Type your comment here"
              value={comment}
              onChange={handleCommentChange}
            />
            <button className="btn btn-primary" onClick={handleCommentSubmit}>Comment</button>
          </div>
        )}
      </div>

      {/* for show comments  */}
      {/* fourth row  */}
      <div className="row border  mt-1">
        {/* for image */}
        <div className="col-10 d-flex pt-1">
          <img className='rounded-circle bg-primary' src="/twitter-logo.png" alt="profilepic" width="25" height="25" />
          <div className='mt-1'>
            <span className='fw-bold p-1 cursor-pointer user-underline'>@username</span>
            <span className='fw-medium p-1'>5 days ago</span>
          </div>
        </div>

        <div className="col text-end">
          <div className='cursor-pointer'>
            <DeleteIcon />
          </div>
        </div>
        {/* second row  */}
        <div className="col-12">
          <p className='ps-5'>
            Lorem ipsum dolor sit amet c non, magni laborum illo ullam tempore. Dolore.
          </p>
        </div>
      </div>
      {/* for show comments  */}
      {/* fourth row  */}
      <div className="row border  mt-1">
        {/* for image */}
        <div className="col-10 d-flex pt-1">
          <img className='rounded-circle bg-primary' src="/twitter-logo.png" alt="profilepic" width="25" height="25" />
          <div className='mt-1'>
            <span className='fw-bold p-1 cursor-pointer user-underline'>@username</span>
            <span className='fw-medium p-1'>5 days ago</span>
          </div>
        </div>

        <div className="col text-end">
          <div className='cursor-pointer'>
            <DeleteIcon />
          </div>
        </div>
        {/* second row  */}
        <div className="col-12">
          <p className='ps-5'>
            Lorem ipsum dolor sit amet c non, magni laborum illo ullam tempore. Dolore.
          </p>
        </div>
      </div>


    </div>
  )
};

export default TweetModel;
