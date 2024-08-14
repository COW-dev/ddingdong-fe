export function parseDate(date: string): string {
  const year = date.substring(2, 4);
  const month = date.substring(5, 7);
  const day = date.substring(8, 10);

  return `${year}.${month}.${day}`;
}

export function parseImgUrl(url: string): string {
  return url?.slice(0, 8) + url?.slice(9);
}
