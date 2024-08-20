import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import ArrowImage from '@/assets/leftArrow.svg';
import ReportItem from '@/components/report/ReportItem';
import { ReportKey } from '@/types/report';

function Index({ term, name }: ReportKey) {
  const router = useRouter();

  const handleClickBackButton = () => {
    router.back();
  };

  return (
    <>
      <Head>
        <title>활동보고서 관리</title>
      </Head>
      <h1
        onClick={handleClickBackButton}
        className="mt-7 flex text-2xl font-bold md:mt-10 md:text-4xl"
      >
        <Image src={ArrowImage} alt="뒤로가기 화살표" width={40} height={40} />
        <span>
          {term}회차 / {name}
        </span>
      </h1>
      <div className="mt-6 w-full gap-4 sm:grid-cols-2 md:mt-8 md:gap-8">
        <ReportItem term={term} name={name} />
      </div>
    </>
  );
}

export default Index;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { term, name } = context.query;
  return {
    props: {
      term: term,
      name: name,
    },
  };
};
