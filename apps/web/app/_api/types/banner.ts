import { UrlType } from './file';

export type Banner = {
  id: number;
  link: string;
  webImageUrl: UrlType;
  mobileImageUrl: UrlType;
};

export type BannerAPIRequest = {
  webImageId: string;
  mobileImageId: string;
  link?: string;
};
