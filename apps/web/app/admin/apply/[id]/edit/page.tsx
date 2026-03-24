import { Metadata } from 'next';

import { FormEditPage } from './_pages/FormEditPage';

export const metadata: Metadata = {
  title: '띵동 어드민 - 지원서 수정',
};

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <FormEditPage formId={Number(id)} />;
}
