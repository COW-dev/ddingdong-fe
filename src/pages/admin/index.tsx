import Head from 'next/head';
import AdminHeading from '@/components/admin/AdminHeading';

export default function Index() {
  return (
    <>
      <Head>
        <title>띵동 - 관리자 홈</title>
      </Head>
      <AdminHeading clubName={'농어민후생연구회 흙'} />
    </>
  );
}
