import { useState } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';

import { noticeQueryOptions } from '@/app/_api/queries/notice';
import { UrlType } from '@/app/_api/types/file';
import { usePresignedUrl } from '@/hooks/usePresignedUrl';
import { sortByOrder } from '@/utils/change';

import { UploadRecord } from '../../../new/_hook/useNewNotice';

export const useEditNotice = (noticeId: number) => {
  const { data: noticeData } = useSuspenseQuery(
    noticeQueryOptions.detail(noticeId),
  );
  const [noticeEditData, setNoticeEditData] = useState(noticeData);
  const [files, setFiles] = useState<UrlType[]>(noticeEditData.files);
  const [images, setImages] = useState<UploadRecord[]>(
    sortByOrder(noticeEditData.images).map((image) => ({
      id: image.id ?? '0',
      name: image.fileName ?? '',
      previewUrl: image.cdnUrl,
      file: new File([], image.fileName ?? ''),
    })),
  );

  const { getPresignedIds: getImagePresignedId, isLoading: isImageLoading } =
    usePresignedUrl();
  const { getPresignedIds: getFilePresignedId, isLoading: isFileLoading } =
    usePresignedUrl();

  const isUploading = isImageLoading || isFileLoading;

  const handleChangeNoticeData = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setNoticeEditData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClickImageUpload = async (
    files: File[] | null,
    urls: string[] | null,
  ) => {
    if (!files || !urls) {
      setImages([]);
      return [];
    }

    const newFiles = files.filter((file) => file.size > 0);
    if (newFiles.length === 0) {
      return setImages((prev) => {
        const fileNames = files.map((file) => file.name);
        return prev.filter((item) => fileNames.includes(item.name ?? ''));
      });
    }

    const uploadInfo = await getImagePresignedId(newFiles);
    setImages((prev) => [
      ...prev,
      ...uploadInfo.map(({ id, file }, index) => {
        return {
          id,
          name: file.name,
          previewUrl: urls[index],
          file,
        };
      }),
    ]);
    return uploadInfo;
  };

  const handleClickFileUpload = async (files: File[]) => {
    const uploadInfo = await getFilePresignedId(files);
    setFiles((prev) => [
      ...prev,
      ...uploadInfo.map(({ id, file }) => ({
        id,
        fileName: file.name,
        cdnUrl: '',
        originUrl: '',
      })),
    ]);
    return uploadInfo;
  };

  const handleClickFileDelete = (fileName: string) => {
    setFiles((prev) => prev.filter((file) => file.fileName !== fileName));
  };

  return {
    noticeEditData,

    files,
    isUploading,
    images,
    handleChangeNoticeData,
    handleClickImageUpload,
    handleClickFileUpload,
    handleClickFileDelete,
  };
};
