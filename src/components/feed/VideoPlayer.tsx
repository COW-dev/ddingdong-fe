import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

type VideoPlayerProps = {
  videoUrl: string;
};

export default function VideoPlayer({ videoUrl }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;

      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = videoUrl;
      } else if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videoUrl);
        hls.attachMedia(video);

        return () => {
          hls.destroy();
        };
      }
    }
  }, [videoUrl]);

  return (
    <video
      className="w-full md:h-[450px]"
      ref={videoRef}
      controls
      autoPlay
      muted
      playsInline
    />
  );
}
