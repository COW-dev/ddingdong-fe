import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { ClubDetail } from '@/app/_api/types/club';

type ClubStore = {
  club: ClubDetail | null;
  setClub: (club: ClubDetail) => void;
  resetClub: () => void;
};

export const useClubStore = create(
  persist<ClubStore>(
    (set) => ({
      club: null,
      setClub: (club) => set({ club }),
      resetClub: () => {
        set({
          club: null,
        });
      },
    }),
    {
      name: 'club',
    },
  ),
);
