import Image from 'next/image';
import { BannerType } from '@/types/banner';

export default function Banner({ data }: { data: BannerType }) {
  if (!data)
    data = {
      id: 0,
      title: 'title',
      subTitle: 'subTitle',
      colorCode: '하늘',
      imgUrl: 'imgUrl',
    };
  const { imgUrl, title, subTitle, id, colorCode } = data;
  const parsedImgUrl = imgUrl.slice(0, 8) + imgUrl.slice(9);
  return (
    <div
      className={`flex h-56 w-full flex-col items-center justify-center rounded-xl  md:h-48 md:flex-row bg-${colorCode}-100`}
    >
      <Image
        src={parsedImgUrl}
        width={100}
        height={100}
        priority
        alt="bannerImg"
        className="mx-4 w-28 object-scale-down drop-shadow-sm md:h-40 md:w-40 "
      />
      <div className="mx-4 mb-4 text-center md:mb-0 md:w-[45%] md:text-left">
        <p className="my-0.5 text-2xl font-bold md:text-4xl">{title}</p>
        <p className="px-10 text-base font-semibold leading-tight opacity-70 md:px-0 md:text-xl">
          {subTitle}
        </p>
      </div>
    </div>
  );
}
