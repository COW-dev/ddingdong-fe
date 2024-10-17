import { UrlType } from '.';

export type NewBanner = {
  token: string;
  formData: FormData;
};

export type ResponseBanner = {
  id: number;
  webImageUrl: UrlType;
  mobileImageUrl: UrlType;
};

export type SubmitBanner = {
  webImageKey: string;
  mobileImageKey: string;
};

export type DeleteBanner = {
  bannerId: number | string;
  token: string;
};
