import { Metadata } from 'next';

import { FeedAdminClientPage } from './_pages/FeedAdminClientPage';

export const metadata: Metadata = {
  title: '띵동 어드민 - 피드 관리',
};

export default function FeedAdminPage() {
  return <FeedAdminClientPage />;
}
