export type PresignedUrlResponse = {
  id: string;
  uploadUrl: string;
  contentType: string;
};

export type OrderUUID = { id: string; order: number };
