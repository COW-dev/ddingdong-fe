import { ClubInfo } from './club';

export type TabMenu = {
  label: string;
  content: JSX.Element;
};

export type Feed = {
  id: number;
  thumbnailUrl: string;
  feedType?: string;
};

export type FeedDetail = {
  id: number;
  clubInfo: ClubInfo;
  activityContent: string;
  fileUrl: string;
  feedType: string;
  createdDate: string;
};
