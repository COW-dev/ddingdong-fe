import { useEffect, useRef, useState } from 'react';

const getStorageKey = (id: number) => `apply-tab-${id}`;

export const useTabState = (id: number, hasInterview: boolean) => {
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTab = sessionStorage.getItem(getStorageKey(id));
      return savedTab ? Number(savedTab) : 0;
    }
    return 0;
  });

  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tabsRef.current || !hasInterview) return;

    const handleTabChange = (index: number) => {
      setActiveTab(index);
      sessionStorage.setItem(getStorageKey(id), String(index));
    };

    const tabButtons = tabsRef.current.querySelectorAll('[role="tab"]');

    const handleTabClick = (event: Event) => {
      const target = event.target as HTMLElement;
      const tabIndex = Array.from(tabButtons).indexOf(target);
      if (tabIndex !== -1) {
        handleTabChange(tabIndex);
      }
    };

    tabButtons.forEach((button) => {
      button.addEventListener('click', handleTabClick);
    });

    return () => {
      tabButtons.forEach((button) => {
        button.removeEventListener('click', handleTabClick);
      });
    };
  }, [hasInterview, id]);

  return {
    activeTab,
    tabsRef,
  };
};
