import { useRouter } from 'next/navigation';

import { useState } from 'react';

import { toast } from 'react-hot-toast';

import { useCreateFeed } from '@/app/_api/mutations/feed';
import { NewFeedAPIRequest } from '@/app/_api/types/feed';
import { usePresignedUrl } from '@/hooks/usePresignedUrl';
import { subscribeToSSE } from '@/utils/subscribeToSSE';

const MAX_FILE_SIZE = 300 * 1024 * 1024;

export const useNewFeed = (token: string) => {
  const router = useRouter();

  const { getPresignedId, isLoading } = usePresignedUrl();
  const [feedData, setFeedData] = useState<NewFeedAPIRequest>({
    activityContent: '',
    mediaId: '',
    mimeType: '',
  });
  const [mediaPreviewUrls, setMediaPreviewUrls] = useState<string[]>([]);
  const [mediaPreviewFiles, setMediaPreviewFiles] = useState<File[] | null>([]);
  const { mutate: createFeed } = useCreateFeed();

  const handleActivityContentChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFeedData((prev) => ({
      ...prev,
      activityContent: e.target.value,
    }));
  };

  const handleActivityContentReset = () => {
    setFeedData((prev) => ({
      ...prev,
      activityContent: '',
    }));
  };

  const handleFileUpload = async (files: File) => {
    if (files.size > MAX_FILE_SIZE) {
      toast.error('파일 크기는 300MB 이하로 업로드해야 합니다.');
      return Promise.reject('파일 크기는 300MB 이하로 업로드해야 합니다.');
    }

    const fileInfo = await getPresignedId(files);
    if (fileInfo) {
      setFeedData((prev) => ({
        ...prev,
        mediaId: fileInfo.id,
        mimeType: fileInfo.file.type,
      }));
    }
  };

  const handleFileChange = (files: File[] | null, urls: string[]) => {
    setMediaPreviewUrls(urls);
    setMediaPreviewFiles(files);
    if (files && files[0]) {
      handleFileUpload(files[0]);
    } else {
      setFeedData((prev) => ({
        ...prev,
        mediaId: '',
        mimeType: '',
      }));
    }
  };

  const handleSubmit = () => {
    if (feedData.mimeType?.includes('video')) {
      router.push('/');
      subscribeToSSE(token, feedData.mediaId, () =>
        createFeed(
          {
            ...feedData,
          },
          {
            onSuccess: () => {
              toast.success('피드가 생성되었어요.');
              router.push('/feed');
            },
          },
        ),
      );
      return;
    }

    createFeed(
      {
        ...feedData,
      },
      {
        onSuccess: () => {
          toast.success('피드가 생성되었어요.');
          router.push('/feed');
        },
      },
    );
  };

  return {
    feedData,
    mediaPreviewUrls,
    mediaPreviewFiles,
    isLoading,
    handleActivityContentChange,
    handleActivityContentReset,
    handleFileChange,
    handleSubmit,
  };
};
