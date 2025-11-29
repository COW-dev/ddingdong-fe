export type PresignedUrlResponse = {
  id: string;
  uploadUrl: string;
  contentType: string;
};

export type UploadFile = {
  id: string;
  file: File;
  contentType?: string;
  [x: string]: string | File | undefined;
};

export type UrlType = {
  id?: string;
  order?: number;
  fileName?: string;
  originUrl: string;
  cdnUrl: string;
};
