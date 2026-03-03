'use client';

import Link from 'next/link';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from 'ddingdong-design-system';

import { Banner } from '@/app/_api/types/banner';
import { OptimizedImage } from '@/components/common/OptimizedImage';

export function ClubCarousel({ bannerData }: { bannerData: Banner[] }) {
  return (
    <Carousel className="rounded-xl shadow-[0_2px_6px_-3px_rgba(0,0,0,0.2)]">
      <CarouselContent className="h-56">
        {bannerData.map((banner, index) => (
          <CarouselItem key={banner.id}>
            <Link
              href={banner.link ?? '/'}
              className="relative hidden items-center justify-center overflow-hidden rounded-lg md:flex md:h-[224px]"
            >
              <OptimizedImage
                isSkeleton
                priority={index === 0}
                width={1024}
                height={224}
                src={`${banner.webImageUrl.cdnUrl}?f=webp&w=2048`}
                srcSet={`${banner.webImageUrl.cdnUrl}?f=webp&w=2048 2048w, ${banner.webImageUrl.cdnUrl}?f=webp&w=1024 1024w, ${banner.webImageUrl.cdnUrl}?f=webp&w=512 512w, ${banner.webImageUrl.cdnUrl}?f=webp&w=256 256w`}
                alt={`배너 ${index + 1}`}
                className="absolute h-full w-full object-scale-down"
              />
            </Link>
            <Link
              href={banner.link ?? '/'}
              className="relative flex h-[224px] w-full items-center justify-center overflow-hidden rounded-lg md:hidden"
            >
              <OptimizedImage
                priority={index === 0}
                width={342}
                height={224}
                src={banner.mobileImageUrl.cdnUrl}
                alt={`배너 ${index + 1}`}
                className="absolute h-full w-full object-scale-down"
              />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
