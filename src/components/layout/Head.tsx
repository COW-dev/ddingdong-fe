import NextHead from 'next/head';
import { DEFAULT_META_TAG } from '@/constants/open-graph';

export default function Head() {
  const { title, description, url, image, type, locale, siteName, favicon } =
    DEFAULT_META_TAG;

  return (
    <NextHead>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0 viewport-fit=cover"
      />
      <title>{title}</title>

      <meta name="title" content={title} />
      <meta name="description" content={description} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image.src} />
      <meta property="og:image:width" content={image?.width} />
      <meta property="og:image:height" content={image?.height} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content={locale} />
      <meta property="og:site_name" content={siteName} />

      <link rel="shortcut icon" href={favicon} />
    </NextHead>
  );
}
