import { useMemo } from 'react';

import { IPFS_S3 } from '../common/config';

type Size = 'thumbBig' | 'thumbSmall';

export function useS3Image(image: string, size: Size) {
  const S3Image = useMemo(() => (image ? `${IPFS_S3}/${image}/${size}.jpg` : ''), [image, size]);

  return S3Image;
}

export function useS3Images(content: { imagehashes: string[] }, size: Size) {
  if (content.imagehashes && content.imagehashes.length > 0) {
    return content.imagehashes.map(imagehash => `${IPFS_S3}/${imagehash}/${size}.jpg`);
  }

  return [];
}

export function useS3PostsImages(posts: any[], size: Size) {
  return posts
    .map(post =>
      post.imagehashes.map(imagehash => ({ post_id: post.post_id, content: `${IPFS_S3}/${imagehash}/${size}.jpg` })),
    )
    .flat();
}
