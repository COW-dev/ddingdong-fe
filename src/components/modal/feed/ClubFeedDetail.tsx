import Image from 'next/image';
import { useFeedDetail } from '@/hooks/api/feed/useFeedDetail';
import { parseImgUrl } from '@/utils/parse';
import Admin from '@/assets/admin.jpg';
import VideoPlayer from '@/components/feed/VideoPlayer';

export type Props = {
  feedId: number;
};
export default function ClubFeedDetail({ feedId }: Props) {
  const { isError, isSuccess, data } = useFeedDetail(feedId);

  if (isError) {
    return <div>에러가 발생했습니다.</div>;
  }

  if (isSuccess) {
    const feed = data.data;
    const imageSrc =
      feed.clubInfo.profileImageUrl.length > 0
        ? parseImgUrl(feed.clubInfo.profileImageUrl)
        : Admin;

    return (
      <div className="flex h-full w-full flex-col justify-center">
        <div className="flex items-center justify-center rounded-t-lg bg-black">
          {feed.feedType === 'VIDEO' ? (
            <VideoPlayer videoUrl={feed.fileUrl} />
          ) : (
            <Image
              src={feed.fileUrl}
              alt={'동아리 피드'}
              height={425}
              style={{ objectFit: 'contain' }}
            />
          )}
        </div>
        <div className=" ml-5 flex h-[20vh] flex-col items-start justify-center md:ml-10 ">
          <div className="flex flex-row items-center justify-center">
            <Image
              src={imageSrc}
              alt={'동아리 대표 이미지'}
              width={10}
              height={10}
              priority
              className="m-auto h-12 w-12 rounded-full object-cover md:h-12 md:w-12"
            />
            <div className="ml-2 text-xl font-semibold md:text-2xl">
              {feed.clubInfo.name}
            </div>
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
