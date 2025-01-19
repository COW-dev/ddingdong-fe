import { UrlType } from '.';
import { ClubProfile } from './club';

export type TabMenu = {
  label: string;
  content: JSX.Element;
};

type FeedKey = 'newestFeeds' | 'clubFeeds';

export type TotalFeed<T extends FeedKey> = {
  [K in T]: Feed[];
} & {
  pagingInfo: PagingInfo;
};

export type NewFeed = {
  activityContent: string;
  mediaId: string;
  mimeType: string;
  token?: string;
};

export type Feed = {
  id: number;
  feedType?: string;
  thumbnailCdnUrl: string;
  thumbnailOriginUrl: string;
};

export type FeedDetail = {
  id: number;
  feedType: 'IMAGE' | 'VIDEO';
  activityContent: string;
  fileUrls: UrlType;
  createdDate: string;
  clubProfile: ClubProfile;
};

export type PagingInfo = {
  hasNext: boolean;
  nextCursorId: number;
  currentCursorId: number;
};

export type DeleteFeed = {
  feedId: number;
  token: string;
};
