import { ClubProfile } from './club';

import { UrlType } from '.';

export type NewFeed = {
  activityContent: string;
  mediaId: string;
  mimeType: string;
  token?: string;
};

export type FeedDetail = {
  id: number;
  feedType: 'IMAGE' | 'VIDEO';
  activityContent: string;
  fileUrls: UrlType;
  createdDate: string;
  clubProfile: ClubProfile;
};

export type DeleteFeed = {
  feedId: number;
  token: string;
};
