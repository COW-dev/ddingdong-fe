import { useState } from 'react';

import { NewNoticeAPIRequest } from '@/app/_api/types/notice';
import { usePresignedUrl } from '@/hooks/common/usePresignedUrl';

type UploadRecord = {
  id: string;
  name: string;
  file: File;
};

export const useNewNotice = () => {
  const [noticeData, setNoticeData] = useState<
    Omit<NewNoticeAPIRequest, 'files' | 'images'>
  >({
    title: '',
    content: '',
  });
  const [files, setFiles] = useState<UploadRecord[]>([]);
  const [images, setImages] = useState<UploadRecord[]>([]);

  const { getPresignedIds: getImagePresignedId, isLoading: isImageLoading } =
    usePresignedUrl();
  const { getPresignedIds: getFilePresignedId, isLoading: isFileLoading } =
    usePresignedUrl();
  const isUploading = isImageLoading || isFileLoading;

  const handleChangeNoticeData = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setNoticeData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClickImageUpload = async (files: File[]) => {
    const uploadInfo = await getImagePresignedId(files);
    const uploadIds = uploadInfo.map(({ id, file }) => ({
      id,
      name: file.name,
      file,
    }));
    setImages((prev) => [...prev, ...uploadIds]);
  };

  console.log('ima', images);

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
    isUploading,
    handleChangeNoticeData,
    handleClickImageUpload,
    handleClickFileUpload,
    handleClickFileDelete,
  };
};
