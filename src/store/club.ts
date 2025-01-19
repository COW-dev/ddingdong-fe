import { create } from 'zustand';

import { ClubDetail } from '@/types/club';

type ClubStore = {
  club: ClubDetail | null;
  setClub: (club: ClubDetail) => void;
};

export const useClubStore = create<ClubStore>((set) => ({
  club: null as ClubDetail | null,
  setClub: (club) => set({ club }),
}));
