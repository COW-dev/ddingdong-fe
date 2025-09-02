import { ClubProfile } from './club';
import { UrlType } from './common';

export type FeedList = {
  newestFeeds: Feed[];
  pagingInfo: PagingInfo;
};

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
