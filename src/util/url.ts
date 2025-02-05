export function stripTitle(title: string): string {
  return title.replace(/(<([^>]+)>)/gi, '');
}

export function getHash(id: number, title: string): string {
  return encodeURI(
    `#List?stmt=${id}-${stripTitle(title).replaceAll(' ', '-')}`
  );
}

export function getUrlWithProtocol(): string {
  if (window.location.protocol) { 
    return window.location.href
  }
  return `https://${window.location.href}`
}
