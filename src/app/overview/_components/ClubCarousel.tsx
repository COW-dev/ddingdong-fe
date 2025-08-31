'use client';

import Image from 'next/image';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from 'ddingdong-design-system';

import { BannerType } from '@/app/_api/types/banner';

export function ClubCarousel({ bannerData }: { bannerData: BannerType[] }) {
  return (
    <Carousel className="rounded-xl shadow-[0_2px_6px_-3px_rgba(0,0,0,0.2)]">
      <CarouselContent className="h-56">
        {bannerData.map((banner, index) => (
          <CarouselItem key={banner.id}>
            <div className="relative h-56 w-full overflow-hidden rounded-lg">
              <Image
                fill
                priority={index === 0}
                src={banner.webImageUrl.cdnUrl}
                alt={`배너 ${index}`}
                className="object-scale-down"
                sizes="(min-width: 768px) 800px, 100vw"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
