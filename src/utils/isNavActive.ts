export default function isNavActive(curPath: string, href: string): boolean {
  if (href === '/') {
    return curPath === '/' || curPath === '/admin';
  }
  return curPath.startsWith(href) || curPath.startsWith('/admin' + href);
}
