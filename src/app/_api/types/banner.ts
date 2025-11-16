import { UrlType } from './file';

export type BannerType = {
  id: number;
  link: string;
  webImageUrl: UrlType;
  mobileImageUrl: UrlType;
};

export type NewBanner = {
  webImageId: string;
  mobileImageId: string;
  link?: string;
};
