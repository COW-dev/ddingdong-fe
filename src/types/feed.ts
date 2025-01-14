import { UrlType } from '.';
import { ClubProfile } from './club';

export type TabMenu = {
  label: string;
  content: JSX.Element;
};

export type TotalFeed = {
  newestFeeds: Feed[];
  pagingInfo: PagingInfo;
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
