import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../Config';
import CONFIG_OBJ from '../../Config';
import TweetModel from '../Tweets/TweetModel';

const Timeline = () => {
    const [timeline, setTimeline] = useState(null);

    const fetchdata = async () => {
        try {
            const data = await axios.get(`${BASE_URL}/timelinetweets`, CONFIG_OBJ);
            if (data.status === 200) {
                setTimeline(data.data);
            }
        } catch (error) {
            console.log("timeline error: " + error);
        }
    }

    useEffect(() => {
        fetchdata();
    }, []);

    return (
        <div>
            {timeline && timeline.map(tweet => (
                <TweetModel key={tweet._id} tweet={tweet} />
            ))}
        </div>
    );
}

export default Timeline;
