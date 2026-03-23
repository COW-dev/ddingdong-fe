'use client';

import { useContext } from 'react';

import { MenuContext } from './menu-context';

export function useMenuCtx() {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error('MenuContext is not provided');
  return ctx;
}
