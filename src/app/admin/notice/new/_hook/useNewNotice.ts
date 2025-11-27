import { useState } from 'react';

import { NewNoticeAPIRequest } from '@/app/_api/types/notice';
import { usePresignedUrl } from '@/hooks/usePresignedUrl';

export type UploadRecord = {
  id: string;
  name: string;
  previewUrl: string;
  file: File;
};

export const useNewNotice = () => {
  const [noticeData, setNoticeData] = useState<
    Omit<NewNoticeAPIRequest, 'files' | 'images'>
  >({
    title: '',
    content: '',
  });
  const [files, setFiles] = useState<Omit<UploadRecord, 'previewUrl'>[]>([]);
  const [images, setImages] = useState<UploadRecord[]>([]);

  const { getPresignedIds: getImagePresignedId, isLoading: isImageLoading } =
    usePresignedUrl();
  const { getPresignedIds: getFilePresignedId, isLoading: isFileLoading } =
    usePresignedUrl();

  const handleChangeNoticeData = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setNoticeData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClickImageUpload = async (
    files: File[] | null,
    urls: string[] | null,
  ) => {
    const validFiles = files?.filter((file) => file.size > 0) || [];

    if (!files || !urls || validFiles.length === 0) {
      setImages([]);
      return [];
    }

    const existingFileNames = new Set(images.map((img) => img.name));
    const newFiles = validFiles.filter(
      (file) => !existingFileNames.has(file.name),
    );

    if (newFiles.length !== 0) {
      const uploadInfo = await getImagePresignedId(newFiles);
      const newImages = uploadInfo.map(({ id, file }, fileIndex) => {
        return {
          id,
          name: file.name,
          file,
          previewUrl: urls[fileIndex],
        };
      });

      setImages((prev) => [...prev, ...newImages]);
      return uploadInfo;
    }

    const currentFileNames = new Set(validFiles.map((file) => file.name));
    setImages((prev) => prev.filter((img) => currentFileNames.has(img.name)));

    return [];
  };

  const handleClickFileUpload = async (files: File[]) => {
    const uploadInfo = await getFilePresignedId(files);
    const uploadIds = uploadInfo.map(({ id, file }) => ({
      id,
      name: file.name,
      file,
    }));
    setFiles((prev) => [...prev, ...uploadIds]);
  };

  const handleClickFileDelete = (fileName: string) => {
    setFiles((prev) => prev.filter((file) => file.name !== fileName));
  };

  return {
    noticeData,
    files,
    images,
    isImageLoading,
    isFileLoading,
    handleChangeNoticeData,
    handleClickImageUpload,
    handleClickFileUpload,
    handleClickFileDelete,
  };
};
