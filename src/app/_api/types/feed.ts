import { ClubProfile } from './club';
import { UrlType } from './file';
type FeedKeys = 'newestFeeds' | 'clubFeeds';

export type FeedList = {
  [K in FeedKeys]: Feed[];
} & { pagingInfo: PagingInfo };

export type NewFeedAPIRequest = {
  activityContent: string;
  mediaId: string;
  mimeType: string;
};

export type Feed = {
  id: number;
  feedType: 'IMAGE' | 'VIDEO';
  thumbnailCdnUrl: string;
  thumbnailOriginUrl: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
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
  viewCount: number;
  likeCount: number;
  commentCount: number;
  comments: Comment[];
};

export type Comment = {
  id: number;
  anonymousName: string;
  content: string;
  createdAt: string;
};

export type LikeFeedAPIRequest = {
  count: number;
};

export type DeleteFeedAPIRequest = {
  feedId: number;
};

export type CreateFeedCommentAPIRequest = {
  content: string;
};

export type CreateFeedCommentAPIResponse = {
  commentId: number;
  anonymousNumber: string;
};

export type DeleteCommentAPIRequest = {
  feedId: number;
  commentId: number;
};
