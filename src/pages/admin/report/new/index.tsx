import Head from 'next/head';
import { useCookies } from 'react-cookie';
import Heading from '@/components/common/Heading';
import ReportWrite from '@/components/report/ReportWrite';
import { useCurrentReports } from '@/hooks/api/club/useCurrentReports';
import { useNewReport } from '@/hooks/api/club/useNewReport';
import { EMPTY_DATA } from './data';

export default function Index() {
  // const [{ token }] = useCookies();
  // const currentTerm: number = useCurrentReports(token).data?.data.term ?? 1;

  const mutation = useNewReport();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData();

    return mutation.mutate(formData);
  }

  return (
    <>
      <Head>
        <title>띵동 일반 동아리 - 활동보고서 작성하기</title>
      </Head>
      <div className="flex flex-row items-end ">
        <Heading>활동 보고서 작성하기</Heading>
        <div className="ml-auto text-xl font-medium md:ml-10 "></div>
      </div>
      <form className="mt-5 w-full md:mt-10 " onSubmit={handleSubmit}>
        <ReportWrite report={[EMPTY_DATA, EMPTY_DATA]} />
        <div className=" fixed bottom-4 right-4 md:mt-6">
          <button
            type="submit"
            className="mr-2 h-11 w-28 rounded-xl bg-blue-100 px-1 py-2.5 text-sm font-bold text-blue-500 transition-colors hover:bg-blue-200 sm:inline-block md:text-base"
          >
            제출하기
          </button>
        </div>
      </form>
    </>
  );
}
