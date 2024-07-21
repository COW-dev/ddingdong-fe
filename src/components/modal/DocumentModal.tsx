import { useState } from 'react';
import { useCookies } from 'react-cookie';
import UploadMultipleFile from '@/components/common/UploadMultipleFiles';
import useModal from '@/hooks/common/useModal';
import NeutralButton from '../common/NeutralButton';

type DocumentModalProps = {
  closeModal: () => void;
};

export default function DocumentModal({ closeModal }: DocumentModalProps) {
  const [title, setTitle] = useState<string>('');
  const [file, setFile] = useState<File[]>([]);
  const [cookies] = useCookies(['token']);

  //const mutation = useNewDocument();

  function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    for (let i = 0; i < file.length; i++) {
      formData.append('uploadFiles', file[i]);
    }
    formData.append('token', cookies.token);
    return mutation.mutate(formData);
  }

  return (
    <>
      <div className="mt-3 h-10 w-full rounded-lg border-gray-100 bg-gray-50  placeholder:text-gray-300 focus:outline-none">
        <label
          className="md:text-md flex h-full  items-center text-sm text-gray-400"
          htmlFor="input"
        >
          <input
            className="ml-3 w-full border-none bg-gray-50 font-semibold text-gray-900 focus:outline-none"
            type="text"
            id="input"
            name="title"
            placeholder="제목을 입력하세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
      </div>
      <UploadMultipleFile file={file} setFile={setFile} />
      <div className=" mt-6 flex h-8 items-center justify-center md:mt-8">
        <button
          className=" rounded-xl bg-gray-100 px-4 py-2.5 text-sm font-semibold text-gray-500 transition-colors hover:bg-gray-200 md:text-base"
          onClick={closeModal}
        >
          취소
        </button>

        <button
          onClick={handleSubmit}
          className="text-md ml-5 rounded-xl bg-blue-500 px-16 py-2 font-bold text-white transition-colors hover:bg-blue-600 md:w-auto "
        >
          업로드하기
        </button>
      </div>
    </>
  );
}
