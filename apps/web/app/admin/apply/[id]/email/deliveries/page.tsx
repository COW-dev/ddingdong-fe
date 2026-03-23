import { EmailDeliveriesClientPage } from './_pages/EmailDeliveriesClientPage';
import { EmailProgressClientPage } from './_pages/EmailProgressClientPage';

export default async function EmailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    status?: string;
    historyId?: string;
  }>;
}) {
  const applyId = Number((await params).id);
  const { status, historyId } = await searchParams;

  if (status === 'in-progress' && historyId) {
    return (
      <EmailProgressClientPage
        applyId={applyId}
        historyId={Number(historyId)}
      />
    );
  }

  return <EmailDeliveriesClientPage id={applyId} />;
}
