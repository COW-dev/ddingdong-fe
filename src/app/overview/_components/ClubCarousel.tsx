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
        {bannerData.map((banner) => (
          <CarouselItem key={banner.id}>
            <Image
              priority
              src={banner.webImageUrl.cdnUrl}
              alt={banner.link}
              width={800}
              height={400}
              className="h-56 w-full rounded-lg object-scale-down"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
