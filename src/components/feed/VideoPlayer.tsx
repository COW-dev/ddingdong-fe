import React, { useState } from 'react';
import ReactPlayer from 'react-player';

type VideoPlayerProps = {
  videoUrl: string;
};

export default function VideoPlayer({ videoUrl }: VideoPlayerProps) {
  return (
    <div className="h-[50vh] w-full rounded-lg">
      <ReactPlayer
        url={videoUrl}
        controls
        width="100%"
        height="100%"
        muted={true}
        playing={true}
      />
    </div>
  );
}
