import { createContext } from 'react';

type TabsContextType = {
  activeLabel: string;
};

export const TabsContext = createContext<TabsContextType | undefined>(undefined);
