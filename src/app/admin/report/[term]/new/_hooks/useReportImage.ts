import { Dispatch, SetStateAction, useState } from 'react';

import { usePresignedUrl } from '@/hooks/common/usePresignedUrl';
import { EditReport } from '@/types/report';

type Props = {
  report: EditReport;
  setValue: Dispatch<SetStateAction<EditReport>>;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
};

export const useReportImage = ({ report, setValue, setIsEditing }: Props) => {
  const { image } = report;
  const { getPresignedId, isLoading } = usePresignedUrl();

  const [mediaPreviewFiles, setMediaPreviewFiles] = useState<File[] | null>([]);
  const [mediaPreviewUrls, setMediaPreviewUrls] = useState<string[]>(
    image?.cdnUrl ? [image.cdnUrl] : [],
  );

  const handleChangeImage = async (files: File[] | null) => {
    if (!files) {
      return setValue((prev) => ({
        ...prev,
        imageId: undefined,
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
    handleChangeImage(files);
    setIsEditing(false);
  };

  return {
    mediaPreviewUrls,
    mediaPreviewFiles,
    isLoading,
    handleFileChange,
  };
};
