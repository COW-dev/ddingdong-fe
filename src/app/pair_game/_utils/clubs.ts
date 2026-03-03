import { CLUBS } from '../_constants/clubs';

const CLUB_MAP = new Map(CLUBS.map((c) => [c.id, c]));

export const getClubById = (id: number) => CLUB_MAP.get(id);
