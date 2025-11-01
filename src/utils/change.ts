import { RefObject } from 'react';

import { UrlType } from '@/app/_api/types/common';

export function createImageOrder(uuids: string[] | null) {
  if (!uuids) return null;
  return uuids.map((uuid, index) => ({
    id: uuid,
    order: index + 1,
  }));
}

export function sortByOrder(urls: UrlType[]) {
  return urls.slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}
