export default function isNavActive(curPath: string, href: string): boolean {
  if (curPath.startsWith('/admin')) {
    const adminPath = '/admin' + href;
    if (adminPath === '/admin/') {
      return curPath + '/' === adminPath;
    }
    return curPath === adminPath;
  }
  if (href === '/') {
    return curPath === href;
  }
  return curPath.startsWith(href);
}
