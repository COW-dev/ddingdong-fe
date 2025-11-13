import { Metadata } from 'next';
import FixNewClientPage from './_pages/FixNewClientPage';

export const metadata: Metadata = {
  title: '띵동 - 동아리방 시설보수 신청하기',
};

export default async function ReportPage() {
  return <FixNewClientPage />;
}
