import React, { useEffect, useState } from 'react';
import './Profile.css';
import { Avatar } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AllTweet from '../../component/Alltweets/AllTweet';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CONFIG_OBJ, { BASE_URL } from '../../Config';
import { parseISO, format } from 'date-fns';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile() {

  const currentuser = useSelector(state => state.userReducer.user);
  // console.log(currentuser._id)
  let id = useParams().id;

  const [user, setUser] = useState(null);
  const [formattedDate, setFormattedDate] = useState(null);

  // console.log(user)
  // debugger

  const fetchdata = async () => {
    try {
      const newData = await axios.get(`${BASE_URL}/profile/${id}`);
      setUser(newData.data.result);
      // Format the date after data is fetched
      if (newData.data.result && newData.data.result.createdAt) {
        const dateObject = parseISO(newData.data.result.createdAt);
        const dateFormatted = format(dateObject, 'dd/MM/yy');
        setFormattedDate(dateFormatted);
      }
    } catch (error) {
      console.log('profile error', error);
    }
  };

  // function for follow or unfollow a user 
  const handelefollowunfollow = async (id) => {
    try {
      const newData = await axios.put(`${BASE_URL}/follow/unfollow/${id}`, {}, CONFIG_OBJ);
      // console.log(newData.data.message);
      toast.success(`${newData.data.message}`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000, // Close the toast after 3 seconds
      });
      fetchdata();

    } catch (error) {
      console.log('follow unfollow error', error);
    }
  }

  useEffect(() => {
    fetchdata();
    // eslint-disable-next-line 
  }, [id]);

  return (
    <div className="container">
      <ToastContainer />
      {user ? ( // Render only when user is not null
        <>
          {/* first row */}
          <div className="row">
            <div className="col-12 profile-sec">
              {/* only for create an empty div */}
            </div>

            <div className="col-12 profile-img-sec">
              <div className="profile-img">
                <Avatar
                  alt="User Profile Picture"
                  src={user.profilePic}
                  style={{ width: 90, height: 90 }}
                />
              </div>
              <div className="float-end mt-1 ">
                <button className="mt-1 px-3 fs-4 fw-bold border border-info rounded-pill edit-button">
                  Edit
                </button>
              </div>
            </div>
          </div>

          {/* second row */}
          <div className="row">
            <div className="col mt-3">
              <div className="my-1">
                <h5 className="fw-bold">@username <span className='text-info '> {user.username}</span> </h5>
                <h6 className="fw-bold">name :  <span className='text-info '>{user.name}</span></h6>
              </div>
              <p>
                <CalendarMonthIcon />Joined :
                <span className='ms-1 fs-6 fw-bold '>
                  {formattedDate}
                </span>
              </p>
              <ul className="list-inline">
                <li className="list-inline-item mx-2">
                  <span>{user.followers.length}</span>{' '}
                  <span className="fw-bolder fs-6">Followers</span>
                </li>
                <li className="list-inline-item mx-2">
                  <span>{user.following.length}</span>{' '}
                  <span className="fw-bolder fs-6">Following</span>
                </li>
                {currentuser._id !== id && <>
                  {user.followers.includes(currentuser._id) &&
                    <li className="list-inline-item mx-5">
                      <button type="button" onClick={() => handelefollowunfollow(user._id)} className="btn btn-primary">
                        UnFollow
                      </button>
                    </li>}
                  {!user.followers.includes(currentuser._id) &&
                    <li className="list-inline-item mx-5">
                      <button type="button" onClick={() => handelefollowunfollow(user._id)} className="btn btn-primary">
                        Follow
                      </button>
                    </li>}


                </>}

              </ul>
            </div>

          </div>

          {/* for showing tweets */}
          <div className="row">
            <AllTweet />
          </div>
        </>
      ) : (
        // Render a loading state or placeholder if user is null
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Profile;
