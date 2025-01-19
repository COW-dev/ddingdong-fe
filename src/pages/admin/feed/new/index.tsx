import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import Admin from '@/assets/admin.jpg';
import ClubSummary from '@/components/club/ClubSummary';
import UploadMedia from '@/components/common/UploadMedia';
import { useNewFeed } from '@/hooks/api/feed/useNewFeed';
import { usePresignedUrl } from '@/hooks/common/usePresignedUrl';
import { useClubStore } from '@/store/club';
import { UploadFile } from '@/types';
import { NewFeed } from '@/types/feed';
import { subscribeToSSE } from '@/utils/subscribeToSSE';

export default function Index() {
  const [{ token }] = useCookies(['token']);
  const club = useClubStore((state) => state.club);
  const router = useRouter();

  const { getPresignedId, isLoading } = usePresignedUrl();
  const [feedData, setFeedData] = useState<NewFeed>({
    activityContent: '',
    mediaId: '',
    mimeType: '',
  });
  const mutation = useNewFeed();

  async function handleFile(files: File): Promise<UploadFile> {
    const fileInfo = await getPresignedId(files);

    if (fileInfo?.id) {
      setFeedData((prev) => ({
        ...prev,
        mediaId: fileInfo.id,
        mimeType: fileInfo?.file.type,
      }));
      return fileInfo;
    }
    throw new Error('이미지 생성에 문제가 생겼습니다.');
  }

  function handleSubmit() {
    if (feedData.mimeType?.includes('video')) {
      mutation.mutate(
        { ...feedData, token },
        {
          onSuccess: () => {
            subscribeToSSE(token, feedData.mediaId);
          },
        },
      );
      return;
    }
    mutation.mutate({ ...feedData, token });
  }

  if (!club) {
    return <div>동아리 정보가 존재하지 않아요.</div>;
  }

  return (
    <>
      <Head>
        <title>띵동 - 피드 등록</title>
      </Head>
      <div className="mt-2 flex items-center justify-between">
        <ClubSummary
          name={club.name}
          tag={club.tag}
          category={club.category}
          profileImageUrl={club.profileImage.cdnUrl ?? Admin.src}
        />
      </div>
      <div className=" h-full w-full items-center justify-center">
        <div className="mt-5 flex w-full flex-col rounded-xl border border-gray-100 md:mt-10">
          <div className=" w-full flex-col p-6">
            <input
              autoFocus
              name="title"
              value={feedData.activityContent}
              onChange={(e) =>
                setFeedData((prev) => ({
                  ...prev,
                  activityContent: e.target.value,
                }))
              }
              placeholder="활동 내용을 입력해 주세요. (최대 20자 이내)"
              className=" mb-4 w-full rounded-xl border border-gray-100 bg-gray-50 p-4 text-base font-medium shadow-sm outline-none"
            />
            <UploadMedia onAdd={handleFile} isLoading={isLoading} />
          </div>
        </div>
        <div className="mt-4 flex w-full items-center justify-center gap-3">
          <button
            onClick={() => router.back()}
            className=" cursor-pointer rounded-lg bg-gray-100 px-4 py-2.5 text-sm font-bold text-gray-500 transition-colors hover:bg-gray-300 md:w-auto md:py-2.5"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={isLoading}
            onClick={handleSubmit}
            className={`text-md rounded-lg bg-blue-500 px-12 py-2.5 font-bold text-white transition-colors hover:bg-blue-600 md:w-auto 
              ${
                isLoading && 'cursor-not-allowed bg-gray-500 hover:bg-gray-500'
              }`}
          >
            업로드 하기
          </button>
        </div>
      </div>
    </>
  );
}
