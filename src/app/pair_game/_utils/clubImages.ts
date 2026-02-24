import { PAIR_GAME_PATH } from './gameImages';

const CLUB_IDS = Array.from({ length: 38 }, (_, i) => i + 1);

export const getClubImageSrc = (clubId: number): string => {
  if (clubId >= 1 && clubId <= 38)
    return `${PAIR_GAME_PATH}/clubs/${clubId}.webp`;
  return '';
};

export const CLUB_IMAGE_SRCS = CLUB_IDS.map(
  (id) => `${PAIR_GAME_PATH}/clubs/${id}.webp`,
);
