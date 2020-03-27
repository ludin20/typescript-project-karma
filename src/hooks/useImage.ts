import { IPFS_S3 } from '../common/config';

export function useS3Image(image: string, size: string) {
  return `${IPFS_S3}/${image}/${size}.jpg`;
}

export function useS3Images(content: { imagehashes: string[] }, size: string) {
  if (content.imagehashes && content.imagehashes.length > 0) {
    return content.imagehashes.map(imagehash => `${IPFS_S3}/${imagehash}/${size}.jpg`);
  }

  return [];
}
