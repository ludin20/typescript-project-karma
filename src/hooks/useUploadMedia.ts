import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import ipfs from '../services/ipfs';
import { uploadPercent, fileUploadStart, fileUploadEnd } from '../store/ducks/action';

interface UseUploadMediaProps {
  media: File;
  author: string;
}

export function useUploadMedia() {
  const dispatch = useDispatch();
  const execute = useCallback(async ({ media, author }: UseUploadMediaProps) => {
    let hash = '';
    const fileType = media.type.split('/')[0];
    try {
      const data = new FormData();
      data.append('file', media);
      const config = {
        onUploadProgress: progressEvent =>
          dispatch(uploadPercent(Math.floor((progressEvent.loaded / media.size) * 100))),
      };
      dispatch(fileUploadStart());
      const response = await ipfs.post(`upload/${fileType}/${author}`, data, config);
      const { guid } = response.data;

      const responseWithHash = await ipfs.get(`progress/${guid}`);
      dispatch(fileUploadEnd());

      hash = responseWithHash.data.hash + '&&' + responseWithHash.data.type;
    } catch (e) {
      console.log(e); //eslint-disable-line no-console
    }

    return hash;
  }, []);

  return execute;
}
