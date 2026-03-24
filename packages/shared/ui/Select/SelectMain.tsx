import { ComponentProps, ReactNode, useState, useRef, useEffect } from 'react';

import { OptionList } from './OptionList';
import { SelectContext } from './Select.context';
import { SelectButton } from './SelectButton';

type Props = {
  /**
   * The size of the select component.
   * @default 'lg'
   */
  size?: 'md' | 'lg';
  /**
   * The currently selected option.
   */
  value: string;
  /**
   * Callback function called when the selected option changes.
   */
  onChange?: (option: string) => void;
  /**
   * The default value of the select component.
   */
  defaultValue: string;
  /**
   * The content to be displayed inside the select component.
   */
  children: ReactNode;
} & Omit<ComponentProps<'select'>, 'value' | 'onChange' | 'size'>;

export function SelectMain({ value, onChange, size = 'lg', defaultValue, children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleSelect = (option: string) => {
    setIsOpen(false);
    onChange?.(option);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <SelectContext.Provider
      value={{
        selected: value,
        onSelect: handleSelect,
        size: size,
      }}
    >
      <div ref={ref} className="relative w-full">
        <SelectButton
          selected={value || defaultValue}
          onClick={() => setIsOpen(!isOpen)}
          size={size}
          isOpen={isOpen}
        />
        {isOpen && <OptionList>{children}</OptionList>}
      </div>
    </SelectContext.Provider>
  );
}
