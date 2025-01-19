import { useEffect } from 'react';
import { useUploadStore } from '@/store/upload';

export default function VideoUploadProgress() {
  const videoUploads = useUploadStore((state) => state.videoUploads);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useEffect(() => {}, [videoUploads]);

  return null;
}
