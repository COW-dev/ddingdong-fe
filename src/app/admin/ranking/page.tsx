import { Metadata } from 'next';

import RankingClientPage from './_pages/RankingClientPage';

export const metadata: Metadata = {
  title: '띵동 - 랭킹',
};

export default async function RankingPage() {
  return <RankingClientPage />;
}
