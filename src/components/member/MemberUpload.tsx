import { useState } from 'react';
import { useCookies } from 'react-cookie';
import UploadExcel from '@/components/common/UploadExcel';
import { useUploadMembers } from '@/hooks/api/member/useUploadMembers';

type Props = {
  closeModal: () => void;
};

export default function MemberUpload({ closeModal }: Props) {
  const [cookies] = useCookies(['token']);
  const mutation = useUploadMembers();
  const [file, setFile] = useState<File | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData();
    file && formData.append('file', file);
    formData.append('token', cookies.token);
    closeModal();
    return mutation.mutate(formData);
  }

  return (
    <div className="h-full w-full">
      <form onSubmit={handleSubmit}>
        {/* <h6 className="text-sm font-semibold text-gray-500">
          파일을 업로드 해주세요.
        </h6> */}
        <span className="text-sm font-semibold leading-none text-red-300">
          동아리원 양식이 변경됨에 따라 <br />
          [동아리원 다운받기] 후 해당 양식으로 업로드해주세요.
        </span>
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
