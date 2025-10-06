import ky from 'ky';

import { fetcher } from '../fetcher';
import { PresignedUrlResponse } from '../types/file';

export const getPresignedUrl = (fileName: string) => {
  return fetcher.get<PresignedUrlResponse>(
    `file/upload-url?fileName=${fileName}`,
  );
};

export const uploadPresignedUrl = (
  file: File,
  uploadUrl: string,
  contentType: string,
) => {
  return ky.put(uploadUrl, {
    body: file,
    headers: {
      'Content-Type': contentType,
    },
  });
};
