import { ClubProfile } from './club';
import { UrlType } from './file';
type FeedKeys = 'newestFeeds' | 'clubFeeds';

export type FeedList = {
  [K in FeedKeys]: Feed[];
} & { pagingInfo: PagingInfo };

export type Feed = {
  id: number;
  feedType: 'IMAGE' | 'VIDEO';
  thumbnailCdnUrl: string;
  thumbnailOriginUrl: string;
};

export type PagingInfo = {
  hasNext: boolean;
  nextCursorId: number;
  currentCursorId: number;
};

export type FeedDetail = {
  id: number;
  feedType: 'IMAGE' | 'VIDEO';
  activityContent: string;
  fileUrls: UrlType;
  createdDate: string;
  clubProfile: ClubProfile;
};
