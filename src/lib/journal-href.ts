/** Hash links stay on the homepage and point back to it from every other page. */
export function journalHref(pathname: string, hash: string): string {
  return pathname === "/" ? hash : `/${hash}`;
}
