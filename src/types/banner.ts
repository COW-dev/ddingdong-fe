export type NewBanner = {
  token: string;
  formData: FormData;
};

export type BannerType = {
  id: number;
  title: string;
  subTitle: string;
  colorCode: string;
  imgUrl: string;
};

export type NewBannerType = {
  title: string;
  subTitle: string;
  colorCode: string;
};

export type DeleteBanner = {
  bannerId: number | string;
  token: string;
};
