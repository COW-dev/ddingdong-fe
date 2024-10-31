import { useCookies } from 'react-cookie';
import { toast } from 'react-hot-toast';
import { getPresignedUrl, uploadPresignedUrl } from '@/apis';

export function usePresignedUrl() {
  const [{ token }] = useCookies(['token']);

  const getId = async (file: File) => {
    try {
      const { data } = await getPresignedUrl(file.name, token);
      const { id, contentType, uploadUrl } = data;

      await uploadPresignedUrl(uploadUrl, file, contentType);

      return id;
    } catch (error) {
      toast.error(`파일첨부 과정에서 문제가 발생했어요.`);
    }
  };

  const getIds = async (files: File[]) => {
    try {
      return await Promise.all(files.map((file) => getKey(file)));
    } catch (error) {
      toast.error(`파일첨부 과정에서 문제가 발생했어요.`);
    }
  };

  return { getId, getIds };
}
