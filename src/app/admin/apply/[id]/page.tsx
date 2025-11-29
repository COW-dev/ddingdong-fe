import { FormClientPage } from './_pages/FormClientPage';

export default async function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <FormClientPage id={Number(id)} />;
}
