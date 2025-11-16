import { UrlType } from '.';

export type DeleteBanner = {
  bannerId: number | string;
  token: string;
};

export type UpdateBanner = {
  id: number;
  data: FormData;
  token: string;
};
