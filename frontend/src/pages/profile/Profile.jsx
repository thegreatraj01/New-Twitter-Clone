import React from 'react';
import './Profile.css'; // You can create your own CSS file for styling
import { Avatar } from '@mui/material'; // You can use Material-UI Avatar for the profile picture
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AllTweet from '../../component/Alltweets/AllTweet';
import CreateTweet from '../../component/CreateTweet/CreateTweet';
function Profile() {



  return (
    <div className="container">
      {/* row for contain tweet model  */}
      <div className='row '>
        <div className=" col-12 d-flex justify-content-end">
          <CreateTweet />
        </div>
      </div>
      
      {/* first row  */}
      <div className="row">
        <div className="col-12 profile-sec">
          {/* only for create a empty div */}
        </div>

        <div className="col-12 profile-img-sec">
          <div className='profile-img'>
            <Avatar
              alt="User Profile Picture"
              src="/profile-image.jpg"
              style={{ width: 90, height: 90 }}
            />
          </div>
          <div className='float-end mt-1 '>
            <button className='mt-1 px-3 fs-4 fw-bold border border-info rounded-pill  edit-button'>Edit </button>
          </div>
        </div>
      </div>
      {/* second row  */}
      <div className="row">
        <div className="col mt-3">
          <div className='my-1'>
            <h5 className='fw-bold '>@username</h5>
            <h6 className='fw-bold ' >@email</h6>
          </div>
          <p><span>  <CalendarMonthIcon /> Joined </span></p>
          <ul className="list-inline">
            <li className="list-inline-item mx-2">
              <span >100</span> <span className='fw-bolder fs-6'>Followers</span>
            </li>
            <li className="list-inline-item mx-2">
              <span >100</span> <span className='fw-bolder fs-6'>Following</span>
            </li>
          </ul>
        </div>
      </div>
      {/* for showing tweets  */}
      <div className="row">
        <AllTweet />
      </div>
    </div>
  );
}

export default Profile;
