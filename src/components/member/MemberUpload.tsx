import { redirect } from 'next/dist/server/api-utils';
import router from 'next/router';
import { useCookies } from 'react-cookie';
import UploadExcel from '@/components/common/UploadExcel';
import { useUpdateMembers } from '@/hooks/api/member/useMembers';
import { parseImgUrl } from '@/utils/parse';

type Props = {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  closeModal: () => void;
};

export default function MemberUpload({ closeModal, file, setFile }: Props) {
  const [cookies] = useCookies(['token']);
  const mutation = useUpdateMembers();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData();
    file && formData.append('file', file);
    formData.append('token', cookies.token);
    closeModal();
    router.push('/');
    return mutation.mutate(formData);
  }

  return (
    <div className="h-full w-full">
      <form onSubmit={handleSubmit}>
        <h6 className=" text-sm font-semibold text-gray-500">
          파일을 업로드 해주세요.
        </h6>
        <UploadExcel file={file} setFile={setFile} />
        <div className="mt-6 flex w-full justify-center">
          <button
            type="button"
            onClick={closeModal}
            className=" cursor-pointer rounded-lg bg-gray-100 px-4 py-2 text-sm font-bold text-gray-500  transition-colors hover:bg-gray-300 md:w-auto md:py-2.5"
          >
            취소
          </button>
          <button className="ml-4 w-40 cursor-pointer rounded-lg bg-blue-500 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-blue-400 md:w-48 md:py-2.5 ">
            업로드 하기
          </button>
        </div>
      </form>
    </div>
  );
}
