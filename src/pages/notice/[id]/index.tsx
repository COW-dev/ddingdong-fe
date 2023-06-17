import { GetServerSideProps } from 'next/types';
import NeutralButton from '@/components/common/NeutralButton';
import { useNoticeInfo } from '@/hooks/useNoticeInfo';

type NoticeDetailProps = {
  noticeId: number;
};

export default function Index({ noticeId }: NoticeDetailProps) {
  const { isLoading, isError, isSuccess, data } = useNoticeInfo(noticeId);

  if (isLoading) {
    <div>loading</div>;
  }
  if (isError) {
    <div>error</div>;
  }
  if (isSuccess) {
    const noticeInfo = data.data;
    console.log(noticeInfo);

    const { title, createdAt, content } = noticeInfo;

    return (
      <>
        <h1 className="mt-7 text-2xl font-bold md:mt-10 md:text-3xl">
          {title}
        </h1>
        <div className="mt-1 border-b pb-6 text-base font-medium text-gray-400 md:pb-8 md:text-lg">
          {new Date(createdAt).toLocaleString()}
        </div>
        <div className="py-8 text-base font-medium md:py-10 md:text-lg">
          {content.split('\n').map((line, idx) => (
            <div key={line + idx}>
              <p>{line}</p>
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
}

export const getServerSideProps: GetServerSideProps = async (context: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: any;
}) => {
  const { id } = context.query;
  return {
    props: {
      noticeId: id,
    },
  };
};
