
/**
 * Helper function to handle url joining.
 *
 * @param { string[] } parts `string[]` The url parts.
 * @returns { string } `string` The cleanly joined string.
 */
export function http_join(...parts: string[]): string {
  return '/' + parts.filter(Boolean).map(part => part.replace(/^\/+|\/+$/g, '')).join('/');
}
