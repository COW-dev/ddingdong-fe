import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';
import { toast } from 'react-hot-toast';
import { getPresignedUrl, uploadPresignedUrl } from '@/apis';

export function usePresignedUrls() {
  const [{ token }] = useCookies(['token']);

  const uploadFile = useMutation(async (file: File) => {
    const { data } = await getPresignedUrl(file.name, token);
    const { id, contentType, uploadUrl } = data;

    await uploadPresignedUrl(file, uploadUrl, contentType);
    return id;
  });

  const getPresignedIds = useCallback(
    async (files: File[]) => {
      try {
        const ids = await Promise.all(
          files.map((file) => uploadFile.mutateAsync(file)),
        );

        return ids;
      } catch (error) {
        toast.error('파일업로드 과정 중 문제가 발생했습니다.');
        throw error;
      }
    },
    [uploadFile],
  );

  return {
    getPresignedIds,
    isLoading: uploadFile.isLoading,
  };
}
