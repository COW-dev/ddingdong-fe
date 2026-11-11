import { Dispatch, SetStateAction, useState } from 'react';

import { toast } from 'react-hot-toast';

import { Report } from '@/_api/types/report';
import { REPORT_MESSAGE } from '@/_constants/reportMessage';
import { usePresignedUrl } from '@/_hooks/usePresignedUrl';

type Props = {
  report: Report;
  setValue: Dispatch<SetStateAction<Report>>;
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
    } catch {
      toast.error(REPORT_MESSAGE.imageUploadFail);
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
