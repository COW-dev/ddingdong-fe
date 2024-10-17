import { useCookies } from 'react-cookie';
import { toast } from 'react-hot-toast';
import { getPresignedUrl, uploadPresignedUrl } from '@/apis';

export function usePresignedUrl(fileName: string) {
  const [{ token }] = useCookies(['token']);

  const getKey = async (file: File) => {
    try {
      const { data } = await getPresignedUrl(fileName, token);
      const { key, contentType, uploadUrl } = data;

      await uploadPresignedUrl(uploadUrl, file, contentType);

      return key;
    } catch (error) {
      toast.error(`파일첨부 과정에서 문제가 발생했어요.`);
    }
  };

  const getkeys = (files: File[]) => {
    return files.map((file) => {
      getKey(file);
    });
  };

  return { getKey, getkeys };
}
