export const formatDate = (date: string) =>
  date?.slice(2).replaceAll('-', '.') || '';
