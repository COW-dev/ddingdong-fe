import Image from 'next/image';
import { ResponseBanner } from '@/types/banner';

export default function Banner(banner: ResponseBanner) {
  const { id, webImageUrl, mobileImageUrl } = banner;
  return (
    <div
      className={`ml-4 flex h-56 flex-col items-center justify-center rounded-xl md:h-48 md:flex-row`}
      key={id}
    >
      <Image
        src={webImageUrl.cdnUrl}
        width={100}
        height={100}
        priority
        alt="bannerImg"
        className="mx-4 w-28 object-scale-down drop-shadow-sm md:h-40 md:w-40 "
      />
    </div>
  );
}
