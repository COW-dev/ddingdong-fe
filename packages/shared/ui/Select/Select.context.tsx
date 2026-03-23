import { createContext, useContext } from 'react';

export type SelectContextType = {
  /**
   * The currently selected option.
   */
  selected: string;
  /**
   * Callback function called when the selected option changes.
   * @returns
   */
  onSelect: (option: string) => void;
  /**
   * The size of the select component.
   */
  size: 'md' | 'lg';
};

export const SelectContext = createContext<SelectContextType | null>(null);

export const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (!context) throw new Error('error');

  return context;
};
