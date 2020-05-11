import { useMemo } from 'react';

import { IPFS_S3 } from '../common/config';

type Size = 'thumbBig' | 'thumbSmall';

export function useS3Image(image: string, size: Size) {
  const S3Image = image ? `${IPFS_S3}/${image}/${size}.jpg` : '';

  return S3Image;
}

export function useS3Images(content: { imagehashes: string[] }, size: Size) {
  if (content.imagehashes && content.imagehashes.length > 0) {
    return content.imagehashes.map(imagehash => `${IPFS_S3}/${imagehash}/${size}.jpg`);
  }

  return [];
}

export function useS3PostMedias(
  content: { post_id: number | string; imagehashes: string[]; videohashes: string[] },
  size: Size,
) {
  if (content.videohashes && content.videohashes.length > 0) {
    return content.videohashes.map(videohash => ({
      post_id: content.post_id,
      type: 'video',
      content: `${IPFS_S3}/${videohash}/yuv420p.mp4`,
      thumbnail: `${IPFS_S3}/${videohash}/thumbnailyuv420p.jpg`,
    }));
  } else if (content.imagehashes && content.imagehashes.length > 0) {
    return content.imagehashes.map(imagehash => ({
      post_id: content.post_id,
      type: 'image',
      content: `${IPFS_S3}/${imagehash}/${size}.jpg`,
    }));
  }

  return [];
}

export function useS3PostsMedias(
  posts: { post_id: number | string; imagehashes: string[]; videohashes: string[] }[],
  size: Size,
) {
  return posts
    .map(post =>
      post.videohashes.length > 0
        ? post.videohashes.map(videohash => ({
            post_id: post.post_id,
            type: 'video',
            content: `${IPFS_S3}/${videohash}/${size}.jpg`,
            thumbnail: `${IPFS_S3}/${videohash}/thumbnailyuv420p.jpg`,
          }))
        : post.imagehashes.map(imagehash => ({
            post_id: post.post_id,
            type: 'image',
            content: `${IPFS_S3}/${imagehash}/${size}.jpg`,
          })),
    )
    .flat();
}
