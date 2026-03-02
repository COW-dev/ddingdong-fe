import { CLUBS } from '../_constants/clubs';
import { PAIR_GAME_PATH } from '../_constants/gameImages';

export const getClubImageSrc = (clubId: number): string =>
  `${PAIR_GAME_PATH}/clubs/${clubId}.webp`;

export const CLUB_IMAGE_SRCS = CLUBS.map((c) => getClubImageSrc(c.id));
