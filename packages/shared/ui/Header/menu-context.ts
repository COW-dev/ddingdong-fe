import { createContext } from 'react';

export type MenuCtx = {
  open: boolean;
  setOpen: (v: boolean) => void;
  triggerId: string;
  contentId: string;
};

export const MenuContext = createContext<MenuCtx | null>(null);
