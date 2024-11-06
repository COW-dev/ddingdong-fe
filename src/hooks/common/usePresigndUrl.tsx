import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';
import { toast } from 'react-hot-toast';
import { getPresignedUrl, uploadPresignedUrl } from '@/apis';

export function usePresignedUrl(fileName: string) {
  const [{ token }] = useCookies(['token']);

  const uploadFile = useMutation(
    async (file: File) => {
      const { data } = await getPresignedUrl(fileName, token);
      const { id, contentType, uploadUrl } = data;

      await uploadPresignedUrl(file, uploadUrl, contentType);
      return id;
    },
    {
      onError: () => {
        toast.error('파일첨부 과정에서 문제가 발생했어요.');
      },
    },
  );

  const getPresignedIds = useCallback(
    async (files: File[]) => {
      const keys = await Promise.all(
        files.map((file) => uploadFile.mutateAsync(file)),
      );

      return keys;
    },
    [uploadFile],
  );

  return {
    getPresignedId: uploadFile.mutateAsync,
    getPresignedIds,
    isLoading: uploadFile.isLoading,
  };
}
