export type PresignedUrlResponse = {
  id: string;
  uploadUrl: string;
  contentType: string;
};

export type UploadFile = {
  id: string;
  file: File;
  [x: string]: string | File;
};

export type UrlType = {
  id?: string;
  order?: number;
  fileName?: string;
  originUrl: string;
  cdnUrl: string;
};
