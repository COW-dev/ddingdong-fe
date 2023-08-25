import { GetServerSideProps } from 'next/types';
import NeutralButton from '@/components/common/NeutralButton';
import { useNoticeInfo } from '@/hooks/api/notice/useNoticeInfo';

type NoticeDetailProps = {
  noticeId: number;
};

export default function Index({ noticeId }: NoticeDetailProps) {
  const { data } = useNoticeInfo(noticeId);
  const noticeInfo = data.data;

  if (!noticeInfo) return null;
  const { title, content, createdAt } = noticeInfo;

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
      <h1 className="mt-7 text-2xl font-bold md:mt-10 md:text-3xl">{title}</h1>
      <div className="mt-1 border-b pb-6 text-base font-medium text-gray-400 md:pb-8 md:text-lg">
        {new Date(createdAt).toLocaleString()}
      </div>
      <div className="py-8 text-base font-medium md:py-10 md:text-lg">
        {content.split('\n').map((line, idx) => (
          <div key={line + idx}>
            <p>{parseUrl(line)}</p>
            <br />
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-end md:mt-6">
        <NeutralButton href="/notice">목록으로 돌아가기</NeutralButton>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context: {
  query: any;
}) => {
  const { id } = context.query;
  return {
    props: {
      noticeId: id,
    },
  };
};
