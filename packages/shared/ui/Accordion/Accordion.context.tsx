import { createContext, useContext } from 'react';

type AccordionContextType = {
  type: 'single' | 'multiple';
  openItems: string[];
  toggleItem: (value: string) => void;
  iconSize?: number;
};

export const AccordionContext = createContext<AccordionContextType | null>(null);

export const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('useAccordion must be used within an AccordionProvider');
  }
  return context;
};
