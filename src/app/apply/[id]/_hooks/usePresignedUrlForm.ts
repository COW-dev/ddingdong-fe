import { fetcher } from '@/app/_api/fetcher';
import { uploadPresignedUrl } from '@/app/_api/services/file';
import { PresignedUrlResponse } from '@/app/_api/types/common';
import { UploadFile } from '@/app/_api/types/file';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const getPresignedUrl = (fileName: string) => {
  return fetcher.get<PresignedUrlResponse>(
    `file/upload-url/form-application?fileName=${fileName}`,
  );
};

export const usePresignedUrlForm = () => {
  const uploadFile = useMutation<UploadFile, Error, File>({
    mutationFn: async (originalFile: File) => {
      const { id, uploadUrl, contentType } = await getPresignedUrl(
        encodeURIComponent(originalFile.name),
      );
      await uploadPresignedUrl(originalFile, uploadUrl, contentType);

      return {
        id,
        file: originalFile,
        contentType,
      };
    },
    onError: (error, variables, context) => {
      console.error('업로드 실패:', error, variables, context);
      toast.error('파일 업로드 중 문제가 발생했어요.');
    },
  });

  const getPresignedId = async (file: File) => {
    try {
      return await uploadFile.mutateAsync(file);
    } catch (e) {
      console.error('❌ getPresignedId Error:', e);

      handleError([file.name]);
    }
  };

  const handleError = (fileNames: string[]) => {
    toast.error(
      `${fileNames.join('\n')} \n ${
        fileNames.length
      }개의 파일을 다시 업로드해주세요. `,
    );
  };

  return {
    getPresignedId,
    isLoading: uploadFile.isPending,
  };
};
