import { useState } from 'react';

import { COLORS, SwitchColor } from '@/shared/lib/colors';

type Props = Omit<React.ComponentProps<'button'>, 'onClick'> & {
  /**
   * color of the switch.
   * @default 'primary'
   */
  color?: SwitchColor;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
};

export function Switch({
  color = 'primary',
  checked,
  defaultChecked = false,
  onCheckedChange,
  className,
  disabled,
  ...props
}: Props) {
  const [uncontrolledChecked, setUncontrolledChecked] = useState(defaultChecked);
  const isChecked = checked ?? uncontrolledChecked;

  const handleClick = () => {
    if (disabled) return;

    const next = !isChecked;
    if (checked === undefined) {
      setUncontrolledChecked(next);
    }
    onCheckedChange?.(next);
  };

  return (
    <button
      {...props}
      type="button"
      role="switch"
      disabled={disabled}
      onClick={handleClick}
      aria-checked={isChecked}
      data-state={isChecked ? 'checked' : 'unchecked'}
      className={[
        'group flex h-3.5 w-7 items-center rounded-full shadow-lg',
        'data-[state=checked]:bg-[var(--switch-color)]',
        'data-[state=unchecked]:bg-gray-500',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ '--switch-color': COLORS[color] } as React.CSSProperties}
    >
      <span className="h-5 w-5 -translate-x-1.5 rounded-full bg-white shadow-inner drop-shadow-md duration-100 group-data-[state=checked]:translate-x-3.5" />
    </button>
  );
}
