import { ClubProfile } from './club';

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
  clubProfile: ClubProfile;
  activityContent: string;
  fileUrl: string;
  feedType: 'IMAGE' | 'VIDEO';
  createdDate: string;
};
