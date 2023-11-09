import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../Config';
// import CONFIG_OBJ from '../../Config';
import TweetModel from '../Tweets/TweetModel';
import { useLocation } from 'react-router-dom';


const AllTweet = () => {
    const [tweets, setTweets] = useState("");

    const location = useLocation().pathname;
    // console.log(location)
    // console.log(tweets);
    // debugger;

    // const fetchdata = async () => {
    //       const newData = await axios.get(`${BASE_URL}/myalltweet`, CONFIG_OBJ);
    //             setTweets(newData.data);
    // }

    const CONFIG_OBJ = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("veryfication-token")
        }
    };
   
    const fetchdata = async () => {
        try {
            if (location.includes("explore")) {
                const newData = await axios.get(`${BASE_URL}/exploretweet`, CONFIG_OBJ);
                if (newData.status === 200) {
                    setTweets(newData.data.posts);
                }
            }
            // else if (location.includes("profile/id")) {
            //     const newData = await axios.get(`${BASE_URL}/myalltweet`, CONFIG_OBJ);
            //     if (newData.status === 200) {
            //         setTweets(newData.data.posts);
            //     }
            // }
            else if (location.includes("/")) {
                const newData = await axios.get(`${BASE_URL}/timelinetweets`, CONFIG_OBJ);
                if (newData.status === 200) {
                    setTweets(newData.data.posts);
                }
            }
        } catch (error) {
            console.log("all tweet error: " + error);
        }
    }



    useEffect(() => {
        fetchdata();
        // eslint-disable-next-line
    }, []);


    return (
        <div>
            {tweets && tweets.map(tweet => (
                <TweetModel key={tweet._id} tweet={tweet} setTweets={setTweets} fetchdata={fetchdata} />
            ))}
        </div>
    );

}

export default AllTweet;



