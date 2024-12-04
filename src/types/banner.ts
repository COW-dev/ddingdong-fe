export type BannerType = {
  id: number;
  title: string;
  subTitle: string;
  colorCode: string;
  imgUrl: string;
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
