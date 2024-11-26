import { useState } from 'react';
import { useCookies } from 'react-cookie';
import UploadMultipleFile from '@/components/common/UploadMultipleFiles';
import { useNewDocument } from '@/hooks/api/document/useNewDocument';
import { usePresignedUrl } from '@/hooks/common/usePresignedUrl';
import { UploadFile } from '@/types';

type DocumentModalProps = {
  closeModal: () => void;
};

export default function DocumentModal({ closeModal }: DocumentModalProps) {
  const [title, setTitle] = useState<string>('');
  const [fileIds, setFileIds] = useState<string[]>([]);
  const [{ token }] = useCookies(['token']);

  const mutation = useNewDocument();

  const { getPresignedIds, isLoading: isDocumentLoading } = usePresignedUrl();

  const handleFileUpload = async (files: File[]): Promise<UploadFile[]> => {
    const documentInfo = await getPresignedIds(files);
    const documentIds = documentInfo.map(({ id }) => id);
    setFileIds(documentIds);
    return documentInfo;
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    closeModal();
    return mutation.mutate({ title, fileIds, token });
  }

  const handleClickFileDelete = (index: string) => {
    setFileIds((prev) => prev.filter((id) => id !== index));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-3 h-12 w-full rounded-lg border border-gray-100 bg-gray-50  placeholder:text-gray-300 focus:outline-none">
        <label
          className="md:text-md flex h-full items-center text-sm text-gray-400"
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
      <UploadMultipleFile
        isLoading={isDocumentLoading}
        onAdd={handleFileUpload}
        onDelete={handleClickFileDelete}
      />
      <div className=" mt-6 flex h-12 items-center justify-center md:mt-8">
        <button
          className=" rounded-lg bg-gray-100 px-4 py-2.5 text-sm font-semibold text-gray-500 transition-colors hover:bg-gray-200 md:text-base"
          onClick={closeModal}
        >
          취소
        </button>

        <button
          type="submit"
          className={`text-md ml-5 rounded-lg bg-blue-500 px-16 py-2.5 font-bold text-white transition-colors hover:bg-blue-600 md:w-auto ${
            isDocumentLoading && 'cursor-not-allowed bg-gray-500'
          }`}
          disabled={isDocumentLoading}
        >
          업로드하기
        </button>
      </div>
    </form>
  );
}
