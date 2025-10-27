'use client';
import { Dispatch, SetStateAction, useState } from 'react';
import { usePresignedUrl } from '@/hooks/common/usePresignedUrl';
import { EditReport } from '@/types/report';

type UseReportImageProps = {
  report: EditReport;
  setValue: Dispatch<SetStateAction<EditReport>>;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
};

export const useReportImage = ({
  report,
  setValue,
  setIsEditing,
}: UseReportImageProps) => {
  const { image } = report;
  const { getPresignedId, isLoading } = usePresignedUrl();

  const [mediaPreviewUrls, setMediaPreviewUrls] = useState<string[]>(
    image?.cdnUrl ? [image.cdnUrl] : [],
  );
  const [mediaPreviewFiles, setMediaPreviewFiles] = useState<File[] | null>([]);

  const handleChangeImage = async (files: File[] | null, urls: string[]) => {
    if (!files) {
      return setValue((prev) => ({
        ...prev,
        imageId: null,
      }));
    }

    try {
      const uploadInfo = await getPresignedId(files[0]);
      if (uploadInfo?.id) {
        setValue((prev) => ({
          ...prev,
          imageId: uploadInfo.id,
        }));
      }
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
    }
  };

  const handleFileChange = (files: File[] | null, urls: string[]) => {
    setIsEditing(true);
    setMediaPreviewUrls(urls);
    setMediaPreviewFiles(files);
    handleChangeImage(files, urls);
    setIsEditing(false);
  };

  return {
    mediaPreviewUrls,
    mediaPreviewFiles,
    isLoading,
    handleFileChange,
  };
};
