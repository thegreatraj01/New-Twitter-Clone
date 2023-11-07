import React from 'react'
import TweetModel from '../../component/Tweets/TweetModel'
import Timeline from '../../component/Timelinetweet/Timeline'

const Home = () => {
  return (
    <div>
      <Timeline />
      <TweetModel />
      <TweetModel />
      <TweetModel />
    </div>
  )
}

export default Home