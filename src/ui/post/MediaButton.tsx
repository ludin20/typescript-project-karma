import React from 'react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import cookie from 'js-cookie';
import { useFormikContext } from 'formik';

import media from '../assets/media.svg';
import { useUploadMedia } from '../../hooks';
import { KARMA_AUTHOR } from '../../common/config';

const Container = styled.div`
  background: rgba(0, 0, 0, 0.4);
  border-radius: 50px;
  padding: 15px 20px;

  display: flex;
  align-items: end;
  justify-content: center;

  font-size: 18px;
  font-weight: 900;
  color: #fff;

  img {
    height: 20px;
    margin-right: 10px;
  }

  cursor: pointer;
`;

interface Props {
  name: string;
  setFiles(data: any): void;
  files: any[];
}

const MediaButton: React.FC<Props> = ({ name, children, files, setFiles }) => {
  const { setFieldValue, values } = useFormikContext<any>();
  const uploadMedia = useUploadMedia();

  const author = cookie.get(KARMA_AUTHOR);

  const onDrop = async (acceptedFiles: File[]) => {
    const hash = await uploadMedia({ media: acceptedFiles[0], author });
    setFieldValue(name, [...values[name], hash]);
    setFiles([
      ...files,
      ...acceptedFiles.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      ),
    ]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop,
  });

  return (
    <Container {...getRootProps()}>
      <input {...getInputProps()} name={name} />
      <img src={media} alt="Profile image" />
      {children}
    </Container>
  );
};

export default MediaButton;
