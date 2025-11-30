'use client';

import { useRouter } from 'next/navigation';

import {
  Body1,
  Body2,
  Button,
  DoubleButton,
  Flex,
  Input,
  MediaUpload,
} from 'ddingdong-design-system';

import { ClubHeading } from '@/app/club/[id]/_components/header/ClubHeading';
import Admin from '@/assets/admin.webp';
import { useClubStore } from '@/store/club';

import { useNewFeed } from '../_hooks/useNewFeed';

export function NewFeedAdminClientPage({ token }: { token: string }) {
  const router = useRouter();
  const club = useClubStore((state) => state.club);
  const {
    feedData,
    mediaPreviewUrls,
    mediaPreviewFiles,
    isLoading,
    handleActivityContentChange,
    handleActivityContentReset,
    handleFileChange,
    handleSubmit,
  } = useNewFeed(token);

  if (!club) {
    return (
      <Flex justifyContent="center" alignItems="center" className="h-screen">
        <Body1 className="text-gray-500">동아리 정보가 존재하지 않아요.</Body1>
      </Flex>
    );
  }

  return (
    <>
      <Flex alignItems="center" justifyContent="between">
        <ClubHeading
          name={club.name}
          tag={club.tag}
          category={club.category}
          profileImage={
            club.profileImage ?? { originUrl: Admin.src, cdnUrl: Admin.src }
          }
        />
      </Flex>
      <Flex
        dir="col"
        alignItems="center"
        justifyContent="center"
        className="w-full"
      >
        <Flex
          dir="col"
          className="mt-5 w-full rounded-xl border border-gray-100"
        >
          <Flex dir="col" alignItems="center" className="w-full gap-5 p-6">
            <Input
              name="activityContent"
              value={feedData.activityContent}
              onChange={handleActivityContentChange}
              onClickReset={handleActivityContentReset}
              placeholder="활동 내용을 입력해 주세요. (최대 20자 이내)"
            />
            <MediaUpload
              acceptedFormats={['image/*', 'video/*']}
              onFileChange={handleFileChange}
              previewUrls={mediaPreviewUrls}
              previewFiles={mediaPreviewFiles}
              className="flex h-96 max-h-96 w-full items-center justify-center"
            />
          </Flex>
        </Flex>
        <DoubleButton
          className="m-auto w-fit p-6"
          left={
            <Button variant="tertiary" size="md" onClick={router.back}>
              <Body2>취소</Body2>
            </Button>
          }
          right={
            <Button
              variant="primary"
              color="blue"
              size="lg"
              disabled={
                isLoading ||
                feedData.activityContent.length === 0 ||
                mediaPreviewUrls.length === 0
              }
              onClick={handleSubmit}
            >
              <Body2>업로드 하기</Body2>
            </Button>
          }
        />
      </Flex>
    </>
  );
}
