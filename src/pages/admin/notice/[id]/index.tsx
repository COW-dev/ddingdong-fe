import { ChangeEvent, useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { GetServerSideProps } from 'next/types';
import { useCookies } from 'react-cookie';
import TextareaAutosize from 'react-textarea-autosize';
import File from '@/assets/file.svg';
import NeutralButton from '@/components/common/NeutralButton';
import UploadFile from '@/components/common/UploadFile';
import UploadImage from '@/components/common/UploadImage';
import { ROLE_TYPE } from '@/constants/text';
import { useDeleteNotice } from '@/hooks/api/notice/useDeleteNotice';
import { useNoticeInfo } from '@/hooks/api/notice/useNoticeInfo';
import { useUpdateNotice } from '@/hooks/api/notice/useUpdateNotice';
import { NoticeDetail } from '@/types/notice';

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
    fileUrls: '',
    imageUrls: '',
  });
  const [image, setImage] = useState<string | null>('');
  const [fileUrl, setFileUrl] = useState<string>([]);
  const {
    data: { data },
  } = useNoticeInfo(noticeId);
  const updateMutation = useUpdateNotice(noticeId);
  const deleteMutation = useDeleteNotice();

  useEffect(() => {
    if (data) {
      setNoticeData(data);
      setImage(data.imageUrls[0]);
      setFileUrl(data.fileUrls[0]);
    }
  }, [data]);
  console.log(data);

  function checkUrl(strUrl: string) {
    const expUrl = /^http[s]?:\/\/([\S]{3,})/i;
    return expUrl.test(strUrl);
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

  function handleClickSubmit() {
    setIsEditing(false);
    const formData = new FormData();
    formData.set('title', noticeData.title);
    formData.set('content', noticeData.content);
    fileUrl.length === 0
      ? formData.set('uploadFiles', ' ')
      : formData.set('uploadFiles', fileUrl);
    noticeData.imageUrls.length === 0
      ? formData.set('imgUrls', ' ')
      : formData.set('imgUrls', noticeData.imageUrls);
    formData.set('token', token);

    return updateMutation.mutate(formData);
  }

  return (
    <>
      <Head>
        <title>띵동 어드민 - 공지사항</title>
      </Head>
      {isEditing ? (
        <TextareaAutosize
          name="title"
          spellCheck={false}
          className="mt-7 resize-none rounded-xl border border-gray-100 bg-gray-50 p-4 text-2xl font-bold outline-none md:mt-10 md:p-5 md:text-3xl"
          value={noticeData?.title}
          onChange={(e) => handleChange(e)}
        />
      ) : (
        <h1 className="mt-7 text-2xl font-bold md:mt-10 md:text-3xl">
          {noticeData.title}
        </h1>
      )}
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
          {isEditing ? (
            <>
              <button
                onClick={handleClickCancel}
                className="p-2 text-gray-500 md:mr-0.5"
              >
                취소
              </button>
              <button
                onClick={handleClickSubmit}
                className="p-2 text-blue-500 md:ml-0.5"
              >
                확인
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleClickEdit}
                className="p-2 text-gray-500 md:mr-0.5"
              >
                수정
              </button>
              <button
                onClick={handleClickDelete}
                className="p-2 text-red-500 md:ml-0.5"
              >
                삭제
              </button>
            </>
          )}
        </div>
      </div>
      {isEditing ? (
        <>
          <span className="mt-3">
            <UploadImage image={parsedImgUrl} setImage={setImage} />
          </span>
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
          <div className=" m-auto mt-5 w-3/4 justify-center overflow-hidden rounded-xl shadow-xl md:flex ">
            {parsedImgUrl && (
              <Image
                src={parsedImgUrl}
                width={1000}
                height={300}
                className="m-auto object-cover"
                alt="reportImage"
              />
            )}
          </div>
          <div className="py-8 text-base font-medium md:py-10 md:text-lg">
            {noticeData.content?.split('\n').map((line, idx) => (
              <div key={idx}>
                {checkUrl(line) ? (
                  <a
                    href={line}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-1"
                  >
                    {line}
                  </a>
                ) : (
                  <p>{line}</p>
                )}
                <br />
              </div>
            ))}
          </div>
        </>
      )}
      <hr className="mt-3" />
      {isEditing ? (
        <div>
          <UploadFile file={fileUrl} setFile={setFileUrl} />
        </div>
      ) : (
        <>
          <div className="py-8 text-sm font-medium text-gray-500 md:py-10 md:text-base">
            {Array.isArray(noticeData.fileUrls) &&
              noticeData.fileUrls.map((item, idx) => (
                <div key={idx}>
                  <a href={cleanFileUrl(item.fileUrl)} download target="_blank">
                    {item.name}
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
