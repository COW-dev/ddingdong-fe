import { ComponentProps } from 'react';

import { cn } from '../../lib/core';
import { IconName } from '../assets';
import { Icon } from '../Icon/Icon';

import { IconColor } from '@/shared/lib/colors';

type IconButtonProps = {
  /**
   * name of the icon.
   */
  iconName: IconName;
  /**
   * color of the icon.
   * @default 'gray'
   */
  color?: IconColor;
  /**
   * size of the icon.
   * @description px 단위로 변환합니다.
   * @default 25
   */
  size?: number;
} & ComponentProps<'button'>;

const hoverColorMap = {
  primary: 'hover:bg-primary-400/20',
  gray: 'hover:bg-gray-400/20',
  red: 'hover:bg-red-400/20',
  green: 'hover:bg-green-400/20',
  black: 'hover:bg-black/20',
  white: 'hover:bg-white/20',
  pink: 'hover: bg-pink/20',
} as const;

export function IconButton({
  iconName,
  color = 'gray',
  size,
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      className={cn('cursor-pointer rounded-md p-1 transition', hoverColorMap[color], className)}
      {...props}
    >
      <Icon name={iconName} color={color} size={size} />
    </button>
  );
}
