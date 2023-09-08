import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import LeftArrow from '@/assets/leftArrow.svg';
import RightArrow from '@/assets/rightArrow.svg';
import { useAllBanners } from '@/hooks/api/banner/useAllBanners';
import Banner from './Banner';

export default function Index() {
  const carousel = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: bannerData } = useAllBanners();

  const movePrev = () => {
    setCurrentIndex((prevIndex) =>
      bannerData && prevIndex === 0
        ? bannerData?.data.length - 1
        : prevIndex - 1,
    );
  };

  const moveNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      bannerData && prevIndex === bannerData?.data.length - 1
        ? 0
        : prevIndex + 1,
    );
  }, [bannerData]);

  useEffect(() => {
    const autoScroll = setInterval(moveNext, 4000);

    return () => {
      clearInterval(autoScroll);
    };
  }, [moveNext]);

  useEffect(() => {
    if (carousel.current)
      carousel.current.scrollLeft =
        carousel.current?.offsetWidth * currentIndex;
  }, [currentIndex]);

  return (
    <div className="carousel relative my-2 overflow-hidden">
      <div className="top left absolute flex h-full w-full justify-between">
        <div className="flex h-full flex-col items-center justify-center">
          <Image
            src={LeftArrow}
            width={50}
            height={50}
            alt="leftButton"
            onClick={movePrev}
            className="z-10 mx-2 w-10  opacity-50 transition-all duration-300 ease-in-out hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-25"
          />
        </div>
        <div className="flex h-full flex-col items-center  justify-center">
          <Image
            src={RightArrow}
            width={50}
            height={50}
            alt="rightButton"
            onClick={moveNext}
            className="z-10 mx-2 w-10  items-end p-0 text-center text-white opacity-50 transition-all duration-300 ease-in-out hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-25"
          />
        </div>
      </div>
      <div
        ref={carousel}
        className="carousel-container relative z-0 flex w-full touch-pan-x snap-x snap-mandatory gap-1 overflow-hidden scroll-smooth"
      >
        {bannerData?.data?.map((resource, index) => (
          <div
            key={index}
            className="carousel-item relative min-w-full snap-start"
          >
            <Banner data={resource} />
          </div>
        ))}
      </div>
    </div>
  );
}
