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
