import { Dispatch, SetStateAction, useState } from 'react';

import { toast } from 'react-hot-toast';

import { ClubDetail } from '@/app/_api/types/club';
import { UrlType } from '@/app/_api/types/file';
import { usePresignedUrl } from '@/hooks/common/usePresignedUrl';

export const useClubImage = (
  image: UrlType,
  setClub: Dispatch<SetStateAction<ClubDetail>>,
  key: string,
) => {
  const { getPresignedId, isLoading } = usePresignedUrl();

  const [mediaPreviewFiles, setMediaPreviewFiles] = useState<File[] | null>([]);
  const [mediaPreviewUrls, setMediaPreviewUrls] = useState<string[]>(
    image?.cdnUrl ? [image.cdnUrl] : [],
  );
  const handleChangeImage = async (files: File[] | null) => {
    if (!files) {
      return setClub((prev) => ({
        ...prev,
        [key]: undefined,
      }));
    }

    try {
      const uploadInfo = await getPresignedId(files[0]);
      if (!uploadInfo) return;

      const url = URL.createObjectURL(uploadInfo.file);
      setClub((prev) => ({
        ...prev,
        [key]: {
          id: uploadInfo?.id,
          originUrl: url,
          cdnUrl: url,
        },
      }));
    } catch {
      toast.error('이미지 업로드에 실패했어요.');
    }
  };

  const handleFileChange = (files: File[] | null, urls: string[]) => {
    setMediaPreviewUrls(urls);
    setMediaPreviewFiles(files);
    handleChangeImage(files);
  };

  return {
    mediaPreviewUrls,
    mediaPreviewFiles,
    isLoading,
    handleFileChange,
  };
};
