import Head from 'next/head';
import AdminHeading from '@/components/admin/AdminHeading';

export default function Index() {
  return (
    <>
      <Head>
        <title>띵동 - 관리자 페이지</title>
      </Head>
      <AdminHeading></AdminHeading>
    </>
  );
}
