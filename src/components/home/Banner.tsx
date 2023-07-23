import Image from 'next/image';
import { BannerTypeProps, init } from '@/pages/admin/banner';

export default function Banner({ data }: BannerTypeProps) {
  if (!data) data = init;
  const { image, title, subTitle, id, color } = data;
  return (
    <div className="flex h-56 w-full flex-col items-center justify-center rounded-xl bg-sky-100 md:h-48 md:flex-row">
      <Image
        src={image}
        width={1000}
        height={1000}
        priority
        alt="bannerImg"
        className="mx-4 w-28 drop-shadow-sm md:w-40"
      />
      <div className="mx-4 mb-4 text-center text-white md:mb-0 md:text-left">
        <p className="my-0.5 text-2xl font-bold md:text-4xl">{title}</p>
        <p className="px-10 text-base font-semibold leading-tight  md:px-0 md:text-xl">
          {subTitle}
        </p>
      </div>
    </div>
  );
}
