import { Metadata } from 'next';

import { ReportNewClientPage } from './_pages/ReportNewClientPage';

export async function generateMetadata({
  params,
}: {
  params: { term: string };
}): Promise<Metadata> {
  const { term } = await params;
  return {
    title: `띵동 - ${term}주차 활동보고서 작성`,
  };
}

export default async function ReportNewPage({
  params,
}: {
  params: { term: string };
}) {
  const { term } = await params;
  return <ReportNewClientPage term={Number(term)} />;
}
