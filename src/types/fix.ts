import { Fix } from '@/app/_api/types/fix';

import { OrderUUID, UrlType } from '.';
import { Comment } from '@/app/_api/types/fix';

export type EditFix = {
  title: string;
  content: string;
  images: string[] | null;
};

export type NewFix = {
  token: string;
  post: Omit<EditFix, 'images'> & {
    images: OrderUUID[] | null;
  };
};
