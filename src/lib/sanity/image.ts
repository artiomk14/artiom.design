import imageUrlBuilder from '@sanity/image-url';
import { client } from './client';

const builder = imageUrlBuilder(client);

type ImageSource = Parameters<ReturnType<typeof imageUrlBuilder>['image']>[0];

/**
 * Generate optimized image URLs from Sanity image assets.
 *
 * @example
 * urlFor(image).width(800).height(600).url()
 * urlFor(image).width(400).format('webp').url()
 */
export function urlFor(source: ImageSource) {
  return builder.image(source);
}

/**
 * Get a responsive image URL with automatic format selection.
 */
export function getImageUrl(
  source: ImageSource,
  width: number,
  height?: number
): string {
  let imageBuilder = builder.image(source).width(width).auto('format').quality(80);

  if (height) {
    imageBuilder = imageBuilder.height(height);
  }

  return imageBuilder.url();
}
