import { useState } from 'react';
import { TabMenu } from '@/types/feed';

type Props = {
  TabMenus: TabMenu[];
  tabContext: 'allClubs' | 'myClub';
};
export default function Tabs({ TabMenus, tabContext }: Props) {
  const [activeTab, setActiveTab] = useState<string>(TabMenus[0].label);
  const handleTabChange = (tabLabel: string) => {
    setActiveTab(tabLabel);
  };

  const renderContent = () => {
    const activeMenu = TabMenus.find((menu) => menu.label === activeTab);
    return activeMenu ? activeMenu.content : null;
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
            {TabMenus.map((tab) => (
              <button
                key={tab.label}
                onClick={() => handleTabChange(tab.label)}
                className={` w-1/${
                  TabMenus.length
                } shrink-0 border-b-2 pb-4 text-base font-medium md:text-xl md:font-semibold
                   ${
                     activeTab === tab.label
                       ? 'border-halloween text-halloween'
                       : 'border-transparent text-gray-500 hover:border-halloween hover:text-halloween'
                   }`}
                aria-current={activeTab === tab.label ? 'page' : undefined}
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
