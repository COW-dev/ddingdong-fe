import { UrlType } from './file';

export type Banner = {
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
