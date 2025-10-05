import { ChangeEvent, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useCookies } from 'react-cookie';
import TextareaAutosize from 'react-textarea-autosize';
import ClipIcon from '@/assets/clipIcon.svg';
import LeftArrow from '@/assets/leftArrow.svg';
import RightArrow from '@/assets/rightArrow.svg';
import NeutralButton from '@/components/common/NeutralButton';
import UploadMultipleFile from '@/components/common/UploadMultipleFiles';
import UploadMultipleImage from '@/components/common/UploadMultipleImage';
import { ROLE_TYPE } from '@/constants/position';
import { useDeleteNotice } from '@/hooks/api/notice/useDeleteNotice';
import { useNoticeInfo } from '@/hooks/api/notice/useNoticeInfo';
import { useUpdateNotice } from '@/hooks/api/notice/useUpdateNotice';
import { usePresignedUrl } from '@/hooks/common/usePresignedUrl';
import { NoticeDetail } from '@/types/notice';
import { createImageOrder, sortByOrder } from '@/utils/change';

type NoticeDetailProps = {
  noticeId: number;
};
export default function Index({ noticeId }: NoticeDetailProps) {
  const [cookies] = useCookies(['token', 'role']);
  const { role, token } = cookies;
  const [isEditing, setIsEditing] = useState(false);
  const [presentIndex, setPresentIndex] = useState<number>(0);
  const [noticeData, setNoticeData] = useState<NoticeDetail>({
    id: noticeId,
    title: '',
    content: '',
    createdAt: '',
    images: [],
    files: [],
  });
  const [fileIds, setFileIds] = useState<string[]>([]);
  const [imageIds, setImageIds] = useState<string[]>([]);

  const {
    data: { data },
  } = useNoticeInfo(noticeId);
  const { getPresignedIds: getImagePresignedId, isLoading: isImageLoading } =
    usePresignedUrl();
  const { getPresignedIds: getFilePresignedId, isLoading: isFileLoading } =
    usePresignedUrl();
  const updateMutation = useUpdateNotice();
  const deleteMutation = useDeleteNotice();

  useEffect(() => {
    if (data) {
      setNoticeData(data);
      const sortedImages = sortByOrder(data.images);
      const sortedFiles = sortByOrder(data.files);
      setFileIds(sortedFiles.map((file) => file.id as string));
      setImageIds(sortedImages.map((file) => file.id as string));
    }
  }, [data]);

  function checkUrl(strUrl: string) {
    const expUrl = /https?:\/\/[^\s"]/;
    return expUrl.test(strUrl);
  }

  function parseUrl(line: string) {
    if (checkUrl(line)) {
      const words = line.split(' ');
      const elements = words.map((word, index) => {
        return checkUrl(word) ? (
          <a
            key={`urlWord${index}`}
            href={word}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate pr-1 whitespace-pre-line underline underline-offset-1"
          >
            {word}
          </a>
        ) : (
          <span key={`urlWord${index}`} className="pr-1">
            {word}
          </span>
        );
      });
      <div className="flex">{elements}</div>;
    } else {
      return <p>{line}</p>;
    }
  }

  function handleClickCancel() {
    setIsEditing(false);
    setNoticeData(data);
  }

  function handleClickEdit() {
    setIsEditing(true);
  }

  function handleClickDelete() {
    deleteMutation.mutate({
      noticeId,
      token: token,
    });
  }

  const handleUploadImage = async (files: File[]) => {
    const uploadInfo = await getImagePresignedId(files);
    const uploadIds = uploadInfo.map(({ id }) => id);
    setImageIds((prev) => [...prev, ...uploadIds]);
    return uploadInfo;
  };

  const handleClickImageDelete = (index: number) => {
    setImageIds((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClickFileAdd = async (files: File[]) => {
    const uploadInfo = await getFilePresignedId(files);
    const uploadIds = uploadInfo.map(({ id }) => id);
    setFileIds((prev) => [...prev, ...uploadIds]);
    return uploadInfo;
  };

  const handleClickFileDelete = (fileId: string) => {
    setFileIds((prev) => prev.filter((id) => id !== fileId));
  };

  function handleChange(
    event: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>,
  ) {
    setNoticeData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  function handleSubmit() {
    setIsEditing(false);

    return updateMutation.mutate({
      noticeId: noticeId,
      title: noticeData.title,
      content: noticeData.content,
      files: createImageOrder(fileIds),
      images: createImageOrder(imageIds),
      token: token,
    });
  }
  const sortedImages = sortByOrder(noticeData.images);
  const sortedFiles = sortByOrder(noticeData.files);

  return (
    <>
      <Head>
        <title>띵동 어드민 - 공지사항</title>
      </Head>
      <TextareaAutosize
        name="title"
        spellCheck={false}
        className={`mt-7 resize-none rounded-xl text-2xl font-bold outline-none md:mt-10 md:text-3xl ${
          isEditing
            ? `border border-gray-100 bg-gray-50 p-4 md:p-5`
            : `bg-white`
        } `}
        value={noticeData?.title}
        placeholder={isEditing ? '제목을 입력해주세요.' : ''}
        disabled={!isEditing}
        onChange={(e) => handleChange(e)}
      />
      <div
        className={`border-b text-base font-medium text-gray-400 md:text-lg ${
          isEditing ? 'mt-2 pl-5 md:pl-6' : 'mt-1'
        }`}
      >
        {new Date(noticeData?.createdAt ?? '').toLocaleString()}
        <div
          className={`-mr-2 mb-1 flex justify-end text-sm font-semibold md:text-base ${
            role === ROLE_TYPE.ROLE_CLUB && 'invisible'
          }`}
        >
          <button
            onClick={isEditing ? handleClickCancel : handleClickEdit}
            className={`p-2 text-gray-500 md:mr-0.5 ${
              isImageLoading ||
              (isFileLoading &&
                'cursor-not-allowed bg-gray-500 hover:bg-gray-600')
            }`}
          >
            {isEditing ? `취소` : `수정`}
          </button>
          <button
            onClick={isEditing ? handleSubmit : handleClickDelete}
            className={`p-2 md:ml-0.5 ${
              isEditing ? `text-blue-500` : `text-red-500`
            }`}
          >
            {isEditing ? `확인` : `삭제`}
          </button>
        </div>
      </div>
      {isEditing ? (
        <>
          <UploadMultipleImage
            isLoading={isImageLoading}
            onAdd={handleUploadImage}
            onDelete={handleClickImageDelete}
            initialImages={sortedImages}
          />
          <TextareaAutosize
            name="content"
            placeholder={isEditing ? '내용을 입력해주세요.' : ''}
            spellCheck={false}
            value={noticeData?.content}
            className="mt-5 h-auto w-full resize-none overflow-hidden rounded-xl border border-gray-100 bg-gray-50 p-4 text-base font-medium outline-none md:mt-3 md:p-5 md:text-lg"
            onChange={(e) => handleChange(e)}
          />
        </>
      ) : (
        <>
          {sortedImages.length > 0 && (
            <>
              <div className="relative m-auto mt-5 flex h-96 w-96 items-center justify-center overflow-hidden rounded-xl p-5 shadow-xl md:h-128 md:w-128">
                {presentIndex > 0 && (
                  <Image
                    src={LeftArrow}
                    width={30}
                    height={30}
                    alt="leftButton"
                    onClick={() => setPresentIndex(presentIndex - 1)}
                    className="absolute top-1/2 left-2 z-10 -translate-y-1/2 cursor-pointer rounded-3xl bg-slate-100 opacity-50 transition-all duration-300 ease-in-out hover:opacity-100"
                  />
                )}
                {sortedImages[presentIndex] && (
                  <Image
                    src={sortedImages[presentIndex]?.originUrl}
                    width={550}
                    height={500}
                    priority
                    alt="noticeImages"
                    className="max-h-full max-w-full object-contain"
                  />
                )}
                {presentIndex < sortedImages.length - 1 && (
                  <Image
                    src={RightArrow}
                    width={30}
                    height={30}
                    alt="rightButton"
                    onClick={() => setPresentIndex(presentIndex + 1)}
                    className="absolute top-1/2 right-2 z-10 -translate-y-1/2 cursor-pointer rounded-3xl bg-slate-100 opacity-50 transition-all duration-300 ease-in-out hover:opacity-100"
                  />
                )}
              </div>
            </>
          )}
          <div className="w-full py-8 text-base font-medium md:py-3 md:text-lg">
            {noticeData.content.split('\n').map((line, idx) => (
              <div key={line + idx} className="my-2">
                {parseUrl(line)}
              </div>
            ))}
          </div>
        </>
      )}
      <hr className="mt-3" />
      {isEditing ? (
        <UploadMultipleFile
          isLoading={isFileLoading}
          onAdd={handleClickFileAdd}
          onDelete={handleClickFileDelete}
          initialFiles={sortedFiles}
        />
      ) : (
        <>
          <div className="py-8 text-sm font-medium text-gray-500 md:py-10 md:text-base">
            {sortedFiles.map((item, idx) => (
              <div key={`notice-file-${idx}`} className="flex gap-3">
                <Image src={ClipIcon} width={10} height={10} alt="file" />
                <a href={item.originUrl} download target="_blank">
                  {item.fileName}
                </a>
              </div>
            ))}
          </div>
        </>
      )}
      <div className="mt-6 flex justify-end md:mt-8">
        <NeutralButton href="/notice">목록으로 돌아가기</NeutralButton>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  return {
    props: {
      noticeId: id,
    },
  };
};
