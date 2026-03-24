import { useContext } from 'react';

import { TabsContext } from './Tabs.context';

type Props = {
  /**
   * tab name to be displayed.
   */
  label: string;
  /**
   * if activated, exposed element.
   */
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export function TabItem({ label, children, ...props }: Props) {
  const content = useContext(TabsContext);
  const isActive = content?.activeLabel === label;

  return (
    <div className={`${!isActive && 'hidden'}`} {...props}>
      {children}
    </div>
  );
}
