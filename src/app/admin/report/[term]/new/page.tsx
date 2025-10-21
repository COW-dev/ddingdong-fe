import { ReportNewClientPage } from './_pages/ReportNewClientPage';

import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { term: string };
}): Promise<Metadata> {
  const { term } = params;
  return {
    title: `띵동 - ${term}주차 활동보고서 작성`,
  };
}

export default function ReportNewPage({
  params,
}: {
  params: { term: string };
}) {
  const { term } = params;
  return <ReportNewClientPage term={term} />;
}
