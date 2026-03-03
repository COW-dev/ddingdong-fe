import { useEffect } from 'react';

const GAME_LAYOUT_BG_VALUE = '#ffffff';

export function useGameLayoutBg() {
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--game-layout-bg',
      GAME_LAYOUT_BG_VALUE,
    );
    return () => {
      document.documentElement.style.removeProperty('--game-layout-bg');
    };
  }, []);
}
