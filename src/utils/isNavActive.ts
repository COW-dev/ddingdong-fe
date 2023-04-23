export default function isNavActive(curPath: string, href: string): boolean {
  if (curPath.startsWith('/admin')) {
    if (curPath === '/admin') {
      return href === '/';
    }
    return curPath.startsWith('/admin' + href);
  }
  if (curPath === '/') {
    return href === '/';
  }
  return curPath.startsWith(href);
}
