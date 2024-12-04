import { UrlType } from '.';

export type BannerType = {
  id: number;
  link: string;
  webImageUrl: UrlType;
  mobileImageUrl: UrlType;
};

export type NewBanner = {
  link: string;
  webImageId: string;
  mobileImageId: string;
  token?: string;
};

export type DeleteBanner = {
  bannerId: number | string;
  token: string;
};

export type UpdateBanner = {
  id: number;
  data: FormData;
  token: string;
};
