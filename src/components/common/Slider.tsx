import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useBanners } from '@/hooks/api/banner/useBanners';

export default function Index() {
  const { data: bannerData } = useBanners();
  const option = {
    loop: true,
  };

  const plugin = [
    Autoplay({
      delay: 5000,
    }),
  ];

  return (
    <Carousel opts={option} plugins={plugin}>
      <CarouselContent>
        {bannerData?.data?.map((resource, index) => (
          <div
            key={index}
            className="carousel-item relative min-w-full snap-start"
          >
            {/* <Banner data={resource} /> */}
          </div>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
