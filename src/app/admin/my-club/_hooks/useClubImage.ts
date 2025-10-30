import { useMemberExcelFile } from './../../member/_hooks/useMemberExcelFile';
import { Dispatch, SetStateAction, useState } from 'react';

import { usePresignedUrl } from '@/hooks/common/usePresignedUrl';
import { ClubDetail } from '@/app/_api/types/club';
import { UrlType } from '@/app/_api/types/file';

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

      const urlType = {
        id: uploadInfo?.id,
        originUrl: 'string',
        cdnUrl: 'string',
      };
      if (uploadInfo?.id) {
        setClub((prev) => ({
          ...prev,
          [key]: urlType,
        }));
      }
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
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
