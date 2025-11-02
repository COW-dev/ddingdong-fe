import { OrderUUID } from '.';

export type EditFix = {
  title: string;
  content: string;
  images: string[] | null;
};

export type NewFix = {
  post: Omit<EditFix, 'images'> & {
    images: OrderUUID[] | null;
  };
};
