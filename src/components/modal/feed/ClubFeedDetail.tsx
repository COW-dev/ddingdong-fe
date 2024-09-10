import Image from 'next/image';
import Link from 'next/link';
import router from 'next/router';
import Admin from '@/assets/admin.jpg';
import VideoPlayer from '@/components/feed/VideoPlayer';
import { useFeedDetail } from '@/hooks/api/feed/useFeedDetail';
import { parseImgUrl } from '@/utils/parse';

export type Props = {
  feedId: number;
};
export default function ClubFeedDetail({ feedId }: Props) {
  const { isError, isSuccess, data } = useFeedDetail(feedId);
  const location = router.pathname === '/feeds';

  if (isError) {
    return <div>에러가 발생했습니다.</div>;
  }

  if (isSuccess) {
    const feed = data.data;

    const imageSrc =
      feed.clubProfile.profileImageUrl.length > 0
        ? parseImgUrl(feed.clubProfile.profileImageUrl)
        : Admin;

    return (
      <div className="flex h-full w-full flex-col ">
        <div
          className={`${
            feed.feedType === 'VIDEO' ? 'h-full ' : 'h-[225px]'
          } w-full  rounded-t-lg bg-black md:h-[450px]`}
        >
          {feed.feedType === 'VIDEO' ? (
            <VideoPlayer videoUrl={feed.fileUrl} />
          ) : (
            <Image
              src={feed.fileUrl}
              alt={'동아리 피드'}
              height={450}
              width={450}
              className="h-full w-full object-contain"
            />
          )}
        </div>
        <div className="ml-5 flex h-[17vh] flex-col items-start justify-center  md:ml-10 ">
          <div className="flex flex-row items-center justify-center">
            <div className="h-12 w-12 overflow-hidden rounded-full border-[1.5px] border-gray-100 md:h-14 md:w-14">
              <Image
                src={imageSrc}
                alt={'동아리 대표 이미지'}
                width={80}
                height={80}
                priority
                className="m-auto h-12 w-12 rounded-full object-cover md:h-14 md:w-14"
              />
            </div>
            <Link
              href={location ? `/club/${feed.clubProfile.id}` : '#'}
              className="ml-2 text-base font-semibold md:text-2xl"
            >
              {feed.clubProfile.name}
            </Link>
          </div>

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
