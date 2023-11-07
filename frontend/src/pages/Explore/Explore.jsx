import React, { useEffect, useState } from 'react';
// import TweetCopy from '../../component/Tweetcopy/TweetCopy';
import CONFIG_OBJ from '../../Config';
import { BASE_URL } from '../../Config';
import axios from 'axios';
import TweetModel from '../../component/Tweets/TweetModel';

const Explore = () => {
  const [Tweets, setTweets] = useState(null)

  const fetchdata = async () => {
    try {
      const data = await axios.get(`${BASE_URL}/exploretweet`, CONFIG_OBJ);
      if (data.status === 200) {
        setTweets(data.data.posts)
      }
    } catch (error) {
      console.log('exploretweet error: ' + error);
    }
  }

  useEffect(() => {
    fetchdata();
  }, [])

  return (
    <div>
      {Tweets && Tweets.map(tweet => (
        <TweetModel key={tweet._id} tweet={tweet} />

      ))}
    </div>
  )
}

export default Explore