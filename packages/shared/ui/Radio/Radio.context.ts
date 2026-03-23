import { createContext } from 'react';

import type { InputValue } from './RadioRoot';

type RadioGroupContextType = {
  name?: string;
  value: InputValue;
  onChange: (value: InputValue) => void;
  disabled?: boolean;
  size: 'md' | 'lg';
};

export const RadioGroupContext = createContext<RadioGroupContextType | undefined>(undefined);
