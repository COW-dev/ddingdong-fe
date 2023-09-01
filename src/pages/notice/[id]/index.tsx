import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import ClipIcon from '@/assets/clipIcon.svg';
import NeutralButton from '@/components/common/NeutralButton';
import { useNoticeInfo } from '@/hooks/api/notice/useNoticeInfo';
import { NoticeDetail } from '@/types/notice';
import { parseImgUrl } from '@/utils/parse';

type NoticeDetailProps = {
  noticeId: number;
};
export default function Index({ noticeId }: NoticeDetailProps) {
  const [noticeData, setNoticeData] = useState<NoticeDetail>({
    id: noticeId,
    title: '',
    content: '',
    createdAt: '',
    fileUrls: [{ fileUrl: '', name: '' }],
    imageUrls: [''],
  });
  const {
    data: { data },
  } = useNoticeInfo(noticeId);
  const { title, createdAt, imageUrls, fileUrls } = noticeData;

  useEffect(() => {
    if (data) {
      setNoticeData(data);
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
            className="truncate whitespace-pre-line pr-1 underline underline-offset-1"
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
  return (
    <>
      <Head>
        <title>띵동 - 공지사항</title>
      </Head>
      {/* 제목 */}
      <div className="mt-7 resize-none rounded-xl bg-white text-2xl font-bold outline-none md:mt-10 md:text-3xl ">
        {title}
      </div>
      <div
        className={`mt-1 border-b text-base font-medium text-gray-400 md:text-lg`}
      >
        {new Date(createdAt ?? '').toLocaleString()}
      </div>
      {/* 내용 */}
      <div
        className={`m-auto mt-10 w-3/4 justify-center overflow-hidden rounded-xl p-5 shadow-xl md:flex ${
          imageUrls.length === 0 && `hidden md:hidden`
        }`}
      >
        <Image
          src={parseImgUrl(imageUrls[0])}
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
      <hr className="mt-3" />
      <div className="py-8 text-sm font-medium text-gray-500 md:py-10 md:text-base">
        {Array.isArray(noticeData.fileUrls) &&
          fileUrls.map((item, idx) => (
            <div key={`notice-file-${idx}`} className="flex gap-3">
              <Image src={ClipIcon} width={10} height={10} alt="file" />
              <a href={parseImgUrl(item.fileUrl)} download target="_blank">
                {item.name}
              </a>
            </div>
          ))}
      </div>
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
