import { motion } from 'framer-motion';
import { useId } from 'react';

import { Portal } from '../Portal';
import { Caption1 } from '../Typography';

import { TOOLTIP_MOTION } from './motion';
import { tooltipColorMap } from './tooltipColorMap';
import { useTooltip } from './useTooltip';

import { cn } from '@/shared/lib/core';

type TooltipProps = {
  /**
   * The content to display in the tooltip
   */
  content: string;
  /**
   * The color of the tooltip
   */
  color: keyof typeof tooltipColorMap;
  /**
   * The animation mode for the tooltip
   */
  animationMode?: keyof typeof TOOLTIP_MOTION;
  /**
   * The content to display in the tooltip
   */
  children: React.ReactNode;
};

export function Tooltip({
  content,
  color = 'gray',
  animationMode = 'SPRING',
  children,
}: TooltipProps) {
  const tooltipId = useId();
  const { open, ref, show, hide, position } = useTooltip();
  const selectedColor = tooltipColorMap[color];
  const animation = TOOLTIP_MOTION[animationMode];

  return (
    <div
      ref={ref}
      className="inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      onClick={() => (open ? hide() : show())}
      aria-describedby={open ? tooltipId : undefined}
    >
      {children}
      <Portal isOpen={open}>
        <motion.div
          id={tooltipId}
          role="tooltip"
          aria-live="polite"
          initial={animation.initial}
          animate={animation.animate}
          exit={animation.exit}
          className={cn(
            'fixed -translate-x-1/2 -translate-y-full rounded px-2 py-1 whitespace-nowrap shadow-lg',
            selectedColor.bg
          )}
          style={{
            top: position?.top,
            left: position?.left,
          }}
        >
          <Caption1 weight="medium" className={selectedColor.text}>
            {content}
          </Caption1>
        </motion.div>
      </Portal>
    </div>
  );
}
