import { ChangeEvent, useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { GetServerSideProps } from 'next/types';
import { useCookies } from 'react-cookie';
import TextareaAutosize from 'react-textarea-autosize';
import ClipIcon from '@/assets/clipIcon.svg';
import NeutralButton from '@/components/common/NeutralButton';
import UploadImage from '@/components/common/UploadImage';
import UploadMultipleFile from '@/components/common/UploadMultipleFiles';
import { ROLE_TYPE } from '@/constants/text';
import { useDeleteNotice } from '@/hooks/api/notice/useDeleteNotice';
import { useNoticeInfo } from '@/hooks/api/notice/useNoticeInfo';
import { useUpdateNotice } from '@/hooks/api/notice/useUpdateNotice';
import { NoticeDetail } from '@/types/notice';
import { parseImgUrl } from '@/utils/parse';

type NoticeDetailProps = {
  noticeId: number;
};

export default function Index({ noticeId }: NoticeDetailProps) {
  const [cookies] = useCookies(['token', 'role']);
  const { role, token } = cookies;
  const [isEditing, setIsEditing] = useState(false);
  const [noticeData, setNoticeData] = useState<NoticeDetail>({
    id: noticeId,
    title: '',
    content: '',
    createdAt: '',
    fileUrls: [{ fileUrl: '', name: '' }],
    imageUrls: [''],
  });
  const [image, setImage] = useState<File | null>(null);
  const [file, setFile] = useState<File[]>([]);
  const {
    data: { data },
  } = useNoticeInfo(noticeId);
  const updateMutation = useUpdateNotice(noticeId);
  const deleteMutation = useDeleteNotice();
  const { imageUrls, fileUrls } = noticeData;

  useEffect(() => {
    if (data) {
      setNoticeData(data);
      setImage(data.imageUrls[0]);
      setFileUrl(data.fileUrls[0]);
    }
  }, [data]);

  function checkUrl(strUrl: string) {
    const expUrl = /^http[s]?:\/\/([\S]{3,})/i;
    return expUrl.test(strUrl);
  }

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
            className="truncate whitespace-pre-line pr-1 text-blue-400"
          >
            {word}
          </a>
        ) : (
          <span key={`urlWord${index}`} className="pr-1">
            {word}
          </span>
        );
      });
      return <div className="flex">{elements}</div>;
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
  function handleChange(
    event: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>,
  ) {
    setNoticeData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  function cleanFileUrl(url: string): string {
    return url.replace('https://.', 'https://');
  }

  const parsedImgUrl = image && image.slice(0, 8) + image.slice(9);

  function handleChange(
    event: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>,
  ) {
    setNoticeData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  function parseFileUrl() {
    let newFile = '';
    for (let i = 0; i < fileUrls.length; i++) {
      newFile += fileUrls[i].fileUrl;
      if (i !== 0) newFile += ',';
    }
    return newFile;
  }

  function handleClickSubmit() {
    setIsEditing(false);
    const formData = new FormData();
    formData.set('title', noticeData.title);
    formData.set('content', noticeData.content);
    image && formData.append('thumbnailImages', image);
    for (let i = 0; i < file.length; i++) {
      formData.append('uploadFiles', file[i]);
    }
    const imgUrls = imageUrls.length === 1 ? imageUrls[0] : '';
    formData.append('imgUrls', imgUrls);
    const fileUrlsData = parseFileUrl();
    formData.append('fileUrls', fileUrlsData);
    formData.set('token', token);
    return updateMutation.mutate(formData);
  }

  return (
    <>
      <Head>
        <title>띵동 어드민 - 공지사항</title>
      </Head>
      {/* 제목 */}
      <TextareaAutosize
        name="title"
        spellCheck={false}
        className={`mt-7 resize-none rounded-xl text-2xl font-bold outline-none md:mt-10 md:text-3xl ${
          isEditing
            ? `border border-gray-100 bg-gray-50 p-4 md:p-5`
            : `bg-white`
        } `}
        value={noticeData?.title}
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
            className="p-2 text-gray-500 md:mr-0.5"
          >
            {isEditing ? `취소` : `수정`}
          </button>
          <button
            onClick={isEditing ? handleClickSubmit : handleClickDelete}
            className={`p-2  md:ml-0.5 ${
              isEditing ? `text-blue-500` : `text-red-500`
            }`}
          >
            {isEditing ? `확인` : `삭제`}
          </button>
        </div>
      </div>
      {/* 내용 */}
      {isEditing ? (
        <>
          <UploadImage
            image={image}
            setImage={setImage}
            imageUrls={imageUrls}
            setNoticeData={setNoticeData}
          />
          <TextareaAutosize
            name="content"
            spellCheck={false}
            value={noticeData?.content}
            className="mt-5 h-auto w-full resize-none overflow-hidden rounded-xl border border-gray-100 bg-gray-50 p-4 text-base font-medium outline-none md:mt-3 md:p-5 md:text-lg"
            onChange={(e) => handleChange(e)}
          />
        </>
      ) : (
        <>
          <div
            className={`m-auto mt-5 w-3/4 justify-center overflow-hidden rounded-xl p-5 shadow-xl md:flex ${
              !image && imageUrls.length === 0 && `hidden md:hidden`
            }`}
          >
            <Image
              src={
                image ? URL.createObjectURL(image) : parseImgUrl(imageUrls[0])
              }
              width={1000}
              height={300}
              className="m-auto object-cover"
              alt="reportImage"
            />
          </div>
          <div className="w-full py-8 text-base font-medium md:py-10 md:text-lg">
            {noticeData.content.split('\n').map((line, idx) => (
              <div key={line + idx}>
                <div className="my-2">{parseUrl(line)}</div>
              </div>
            ))}
          </div>
        </>
      )}
      <hr className="mt-3" />
      {isEditing ? (
        <UploadMultipleFile
          file={file}
          setFile={setFile}
          fileUrls={fileUrls}
          setNoticeData={setNoticeData}
        />
      ) : (
        <>
          <div className="py-8 text-sm font-medium text-gray-500 md:py-10 md:text-base">
            {Array.isArray(noticeData.fileUrls) &&
              noticeData.fileUrls.map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <Image src={ClipIcon} width={10} height={10} alt="file" />
                  <a href={parseImgUrl(item.fileUrl)} download target="_blank">

                    {item.name}
                  </a>
                </div>
              ))}
            {file.map((item) => (
              <>
                <div className="flex gap-3">
                  <Image src={ClipIcon} width={10} height={10} alt="file" />
                  {item.name}
                </div>
              </>
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
