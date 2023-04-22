export default function isNavActive(curPath: string, href: string): boolean {
  if (href === '/') {
    return curPath === href;
  }
  return curPath.startsWith(href);
}
