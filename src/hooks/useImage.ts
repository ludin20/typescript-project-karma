import { IPFS_S3 } from '../common/config';

type Size = 'thumbBig' | 'thumbSmall';

export function useS3Image(image: string, size: Size) {
  return `${IPFS_S3}/${image}/${size}.jpg`;
}

export function useS3Images(content: { imagehashes: string[] }, size: Size) {
  if (content.imagehashes && content.imagehashes.length > 0) {
    return content.imagehashes.map(imagehash => `${IPFS_S3}/${imagehash}/${size}.jpg`);
  }

  return [];
}

export function useS3PostsImages(posts: any[], size: Size) {
  return posts.map(post => post.imagehashes.map(imagehash => `${IPFS_S3}/${imagehash}/${size}.jpg`)).flat();
}
