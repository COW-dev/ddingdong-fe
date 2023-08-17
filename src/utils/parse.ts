export function parseDateToString(date: Date): string {
  const year: number = date.getFullYear();
  const month: string = String(date.getMonth() + 1).padStart(2, '0');
  const day: string = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function parseImgUrl(url: string): string {
  return url.slice(0, 8) + url.slice(9);
}
