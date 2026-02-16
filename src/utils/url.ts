import { siteConfig } from '@/config/site';

export function getBaseUrl(): string {
  return `https://${siteConfig.brand.domain}`;
}

export function getAbsoluteUrl(path: string): string {
  const base = getBaseUrl();
  return `${base}${path}`;
}
