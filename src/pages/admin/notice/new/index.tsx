import { useState } from 'react';
import Head from 'next/head';
import { useCookies } from 'react-cookie';
import TextareaAutosize from 'react-textarea-autosize';
import UploadMultipleFile from '@/components/common/UploadMultipleFiles';
import UploadMultipleImage from '@/components/common/UploadMultipleImage';
import { useNewNotice } from '@/hooks/api/notice/useNewNotice';
import { usePresignedUrl } from '@/hooks/common/usePresignedUrl';

export default function Index() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [fileIds, setFileIds] = useState<string[]>([]);
  const [imageIds, setImageId] = useState<string[]>([]);
  const mutation = useNewNotice();
  const [{ token }] = useCookies(['token']);
  const { getPresignedIds: getImagePresignedId, isLoading: isImageLoading } =
    usePresignedUrl();
  const { getPresignedIds: getFilePresignedId, isLoading: isFileLoading } =
    usePresignedUrl();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    return mutation.mutate({
      title,
      content,
      fileIds,
      imageIds,
      token,
    });
  }

  const handleClickImage = async (files: File[]) => {
    const uploadInfo = await getImagePresignedId(files);
    const uploadIds = uploadInfo.map(({ id }) => id);
    setImageId((prev) => [...prev, ...uploadIds]);
    return uploadInfo;
  };

  const handleClickImageDelete = (index: number) => {
    setImageId((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClickFile = async (files: File[]) => {
    const uploadInfo = await getFilePresignedId(files);
    const uploadIds = uploadInfo.map(({ id }) => id);
    setFileIds((prev) => [...prev, ...uploadIds]);
    return uploadInfo;
  };

  const handleClickFileDelete = (fileId: string) => {
    setFileIds((prev) => prev.filter((id) => id !== fileId));
  };

  return (
    <>
      <Head>
        <title>띵동 어드민 - 공지사항 작성하기</title>
      </Head>
      <h1 className="mt-7 text-3xl font-bold md:mt-10 md:text-4xl">
        공지사항 작성하기
      </h1>
      <form
        className="mt-12 flex w-full flex-col md:mt-14"
        onSubmit={handleSubmit}
      >
        <TextareaAutosize
          value={title}
          spellCheck={false}
          className="w-full resize-none rounded-none border-b pb-2 text-xl font-semibold outline-none placeholder:text-gray-300 md:pb-3 md:text-2xl"
          placeholder="제목"
          onChange={(event) => setTitle(event.target.value)}
        />

        <UploadMultipleImage
          isLoading={isImageLoading}
          onDelete={handleClickImageDelete}
          onAdd={handleClickImage}
        />

        <TextareaAutosize
          minRows={8}
          value={content}
          spellCheck={false}
          placeholder="내용을 입력하세요"
          onChange={(event) => setContent(event.target.value)}
          className="mt-6 h-auto w-full resize-none overflow-hidden rounded-none border-b pb-2 text-base font-medium outline-none placeholder:text-gray-300 md:mt-8 md:pb-3 md:text-lg"
        />
        <UploadMultipleFile
          isLoading={isFileLoading}
          onAdd={handleClickFile}
          onDelete={handleClickFileDelete}
        />
        <div className="mt-4 flex justify-end md:mt-6">
          <button
            type="submit"
            className={`w-full rounded-xl bg-blue-100 px-4 py-4 font-bold text-blue-500 transition-colors hover:bg-blue-200 md:w-auto md:py-2.5 ${
              isImageLoading ||
              (isFileLoading &&
                ' cursor-not-allowed bg-gray-500 hover:bg-gray-600')
            }`}
            disabled={isImageLoading || isFileLoading}
          >
            작성하기
          </button>
        </div>
      </form>
    </>
  );
}
