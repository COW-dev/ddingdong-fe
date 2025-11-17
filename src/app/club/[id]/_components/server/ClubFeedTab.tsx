import { fetcher } from '@/app/_api/fetcher';
import { FeedList } from '@/app/_api/types/feed';

import { ClubFeedTabClient } from '../ClubFeedTabClient';

async function fetchClubFeed(id: number): Promise<FeedList> {
  return fetcher.get<FeedList>(`clubs/${id}/feeds?currentCursorId=-1&size=9`);
}

export async function ClubFeedTab({ id }: { id: number }) {
  const feedData = await fetchClubFeed(id);

  return <ClubFeedTabClient feeds={feedData.clubFeeds} />;
}
