import { Metadata } from 'next';

import { ApplyNewClientPage } from './_pages/ApplyNewClientPage';

export const metadata: Metadata = {
  title: '띵동 어드민 - 지원서 템플릿 관리',
};
export default function ApplyNewPage() {
  return <ApplyNewClientPage />;
}
