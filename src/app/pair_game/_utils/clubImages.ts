const CLUB_IDS = Array.from({ length: 38 }, (_, i) => i + 1);

export const getClubImageSrc = (clubId: number): string => {
  if (clubId >= 1 && clubId <= 38) return `/pair_game/clubs/${clubId}.webp`;
  return '';
};

export const CLUB_IMAGE_SRCS = CLUB_IDS.map((id) => `/pair_game/clubs/${id}.webp`);
