import { EmailStatusDetailClientPage } from './_pages/EmailStatusDetailClientPage';

export default async function EmailStatusDetailPage({
  params,
}: {
  params: Promise<{ id: string; status: string }>;
}) {
  const { id, status } = await params;

  return <EmailStatusDetailClientPage id={Number(id)} status={status} />;
}
