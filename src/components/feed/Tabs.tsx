import { useState } from 'react';
import { TabMenu } from '@/types/feed';

type Props = {
  TabMenus: TabMenu[];
  tabContext: 'allClubs' | 'myClub';
  onTabChange?: (index: number) => void;
};
export default function Tabs({ TabMenus, tabContext, onTabChange }: Props) {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const handleTabChange = (index: number) => {
    setActiveTabIndex(index);
    onTabChange?.(index);
  };

  const renderContent = () => {
    return TabMenus[activeTabIndex].content;
  };

  return (
    <div
      className={` mt-5 w-full md:mt-10 ${
        tabContext === 'allClubs' && 'lg:w-[72%]'
      }`}
    >
      <div className="sr-only">
        <label htmlFor="Tab">Tab</label>
      </div>

      <div className="sm:block">
        <div className="border-b border-gray-200">
          <nav
            className="-mb-px flex items-center justify-between"
            aria-label="Tabs"
          >
            {TabMenus.map((tab, index) => (
              <button
                key={tab.label}
                onClick={() => handleTabChange(index)}
                className={` w-1/${
                  TabMenus.length
                } shrink-0 border-b-2 pb-4 text-base font-medium md:text-xl md:font-semibold
                   ${
                     activeTabIndex === index
                       ? 'border-blue-500 text-blue-500'
                       : 'border-transparent text-gray-500 hover:border-blue-500 hover:text-blue-500'
                   }`}
                aria-current={activeTabIndex === index ? 'page' : undefined}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="mt-4">{renderContent()}</div>
    </div>
  );
}
