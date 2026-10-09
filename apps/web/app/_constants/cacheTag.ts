export const CACHE_TAG = {
  CLUBS: 'clubs',
  BANNERS: 'banners',
} as const;

export type CacheTag = (typeof CACHE_TAG)[keyof typeof CACHE_TAG];

export const isCacheTag = (value: unknown): value is CacheTag =>
  Object.values(CACHE_TAG).some((tag) => tag === value);
