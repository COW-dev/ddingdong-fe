import NoticeEditClientPage from './_pages/NoticeEditClientPage';

export default async function NoticeEditPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  return <NoticeEditClientPage noticeId={Number(id)} />;
}
