import { RefObject } from 'react';
import { UrlType } from '@/types';
import { Fix } from '@/types/fix';

export function sortFixZone(posts: Fix[]): Fix[] {
  return posts.sort((a, b) => {
    if (a.isCompleted !== b.isCompleted) {
      return a.isCompleted ? 1 : -1;
    }
    return (
      new Date(b.requestedAt).getTime() - new Date(a.requestedAt).getTime()
    );
  });
}

export function adjustTextareaHeight(
  textareaRef: RefObject<HTMLTextAreaElement | null>,
) {
  if (textareaRef.current) {
    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }
}

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
