import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useAllBanners } from '@/hooks/api/banner/useAllBanners';
import Banner from './Banner';

export default function Index() {
  const { data: bannerData } = useAllBanners();

  return (
    <Carousel
      opts={{
        loop: true,
      }}
    >
      <CarouselContent>
        {bannerData?.data?.map((resource, index) => (
          <div
            key={index}
            className="carousel-item relative min-w-full snap-start"
          >
            <Banner data={resource} />
          </div>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
