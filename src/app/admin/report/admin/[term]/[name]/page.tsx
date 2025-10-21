import { ReportDetailClientPage } from './_pages/ReportDetailClientPage';

import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { term: string; name: string };
}): Promise<Metadata> {
  const { term, name } = params;
  return {
    title: `띵동 - ${name} ${term}주차 활동보고서`,
    description: `${name ?? '동아리'}의 ${term}주차 활동보고서 페이지입니다.`,
  };
}

export default function ReportAdminTermNamePage({
  params,
}: {
  params: { term: string; name: string };
}) {
  const { term, name } = params;
  return <ReportDetailClientPage term={Number(term)} name={name} />;
}
