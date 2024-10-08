import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import router from 'next/router';
import Admin from '@/assets/admin.jpg';
import Skeleton from '@/components/common/Skeleton';
import VideoPlayer from '@/components/feed/VideoPlayer';
import { useFeedDetail } from '@/hooks/api/feed/useFeedDetail';
import { parseImgUrl } from '@/utils/parse';

export type Props = {
  feedId: number;
};
export default function ClubFeedDetail({ feedId }: Props) {
  const { isError, isSuccess, data } = useFeedDetail(feedId);
  const [loadedImages, setLoadedImages] = useState<boolean>(false);
  const location = router.pathname === '/feeds';

  if (isError) {
    return <div>ERROR</div>;
  }

  if (isSuccess) {
    const feed = data.data;

    const imageSrc =
      feed.clubProfile.profileImageUrl?.length > 0
        ? parseImgUrl(feed.clubProfile?.profileImageUrl)
        : Admin;

    const renderSkeleton = () => (
      <div className="absolute inset-0">
        <Skeleton />
      </div>
    );

    return (
      <div className="flex h-full w-full flex-col ">
        <div
          className={`${
            feed.feedType === 'VIDEO' ? 'h-full ' : 'h-[225px]'
          } relative  w-full rounded-t-lg bg-black md:h-[450px]`}
        >
          {feed.feedType === 'VIDEO' ? (
            <VideoPlayer videoUrl={feed.fileUrl} />
          ) : (
            <>
              {!loadedImages && renderSkeleton()}
              <Image
                src={feed.fileUrl}
                alt={'동아리 피드'}
                height={450}
                width={450}
                onLoad={() => setLoadedImages(true)}
                className="h-full w-full object-contain"
              />
            </>
          )}
        </div>
        <div className="ml-5 flex h-[17vh] flex-col items-start justify-center md:ml-10 ">
          <Link
            href={location ? `/club/${feed.clubProfile.id}` : '#'}
            className="flex items-center text-base font-semibold md:text-2xl"
          >
            <Image
              src={imageSrc}
              alt={'동아리 대표 이미지'}
              width={80}
              height={80}
              priority
              className="m-auto mr-3 h-12 w-12 rounded-full border-[1.5px] object-cover md:h-14 md:w-14"
            />
            {feed.clubProfile.name}
          </Link>

          <div className="my-1 text-base font-medium md:text-xl">
            {feed.activityContent}
          </div>
          <div className="font-base md:text-md text-base text-gray-500 ">
            {feed.createdDate}
          </div>
        </div>
      </div>
    );
  }
  return null;
}
