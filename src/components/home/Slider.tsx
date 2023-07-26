import { useState, useRef, useEffect } from 'react';
import { useAllBanners } from '@/hooks/api/banner/useAllBanners';
import Banner from '../common/Banner';

export default function Index() {
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef(null);
  const { data: bannerData } = useAllBanners();

  const movePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? bannerData?.data.length - 1 : prevIndex - 1,
    );
  };

  const moveNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === bannerData?.data.length - 1 ? 0 : prevIndex + 1,
    );
  };

  useEffect(() => {
    // Set up automatic scrolling to the right
    const autoScroll = setInterval(moveNext, 5000); // Adjust the interval as needed (3000ms = 3 seconds)

    return () => {
      // Clean up the interval on component unmount
      clearInterval(autoScroll);
    };
  }, []);

  useEffect(() => {
    // Move the carousel to the right (increasing x)
    if (carousel.current) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
  }, [currentIndex]);

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;
  }, [bannerData]);

  return (
    <div className="carousel mx-auto my-12">
      <div className="relative overflow-hidden">
        <div className="top left absolute flex h-full w-full justify-between">
          <button
            onClick={movePrev}
            className="z-10 m-0 h-full w-10 p-0 text-center text-white opacity-75 transition-all duration-300 ease-in-out hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-25"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="-ml-5 h-12 w-20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={moveNext}
            className="z-10 m-0 h-full w-10 p-0 text-center text-white opacity-75 transition-all duration-300 ease-in-out  hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-25"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="-ml-5 h-12 w-20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
        <div
          ref={carousel}
          className="carousel-container relative z-0 flex w-full touch-pan-x snap-x snap-mandatory gap-1 overflow-hidden scroll-smooth"
        >
          {bannerData?.data.map((resource, index) => (
            <div
              key={index}
              className="carousel-item relative min-w-[100vw] snap-start"
            >
              <Banner data={resource} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
