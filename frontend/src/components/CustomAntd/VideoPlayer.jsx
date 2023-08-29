import * as React from 'react';
import ReactPlayer from 'react-player'

const VideoPlayer = (({ url }) => {
    const token = localStorage.getItem('token')
    return <ReactPlayer url={`${url}`}
        width="99%"
        controls={true} />
});

export default VideoPlayer;
