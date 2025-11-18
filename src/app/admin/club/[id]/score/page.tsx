import { Metadata } from 'next';

import ScoreClientPage from './_pages/ScoreClientPage';

export const metadata: Metadata = {
  title: '띵동 - 동아리 점수',
};

export default async function ClubDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  return <ScoreClientPage id={id} />;
}
