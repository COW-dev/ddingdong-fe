export type PresignedUrlResponse = {
  id: string;
  uploadUrl: string;
  contentType: string;
};

export type UrlType = {
  id?: string;
  order?: number;
  fileName?: string;
  originUrl: string;
  cdnUrl: string;
};
