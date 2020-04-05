import { useCallback } from 'react';

import ipfs from '../services/ipfs';

interface UseUploadMediaProps {
  media: File;
  author: string;
}

export function useUploadMedia() {
  const execute = useCallback(async ({ media, author }: UseUploadMediaProps) => {
    let hash = '';
    try {
      const data = new FormData();
      data.append('file', media);

      const response = await ipfs.post(`upload/image/${author}`, data);
      const { guid } = response.data;

      const responseWithHash = await ipfs.get(`progress/${guid}`);

      hash = responseWithHash.data.hash;
    } catch (e) {
      console.log(e); //eslint-disable-line no-console
    }

    return hash;
  }, []);

  return execute;
}
