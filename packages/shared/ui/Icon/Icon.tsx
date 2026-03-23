import { COLORS, IconColor } from '@/shared/lib/colors';

import { IconName, Icons } from '../assets';

type Props = {
  /**
   * icon name to be displayed.
   */
  name: IconName;
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
} & Omit<React.SVGProps<SVGSVGElement>, 'color'>;

export function Icon({ name, color = 'gray', size = 25, ...props }: Props) {
  const SVGIcon = Icons[name];

  return (
    <SVGIcon width={`${size}px`} height={`${size}px`} style={{ color: COLORS[color] }} {...props} />
  );
}
