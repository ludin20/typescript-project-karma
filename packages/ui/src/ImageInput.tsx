import React, { useState } from 'react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';

import camera from '../assets/camera.svg';

const Container = styled.div`
  width: 100px;
  height: 100px;
  background: ${props => props.theme.black};
  border-radius: 50%;
  margin-right: 30px;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  cursor: pointer;

  img {
    width: 40px;
  }
`;

const WithPreview = styled.div`
  width: 100px;
  height: 100px;

  > img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  div {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 50%;

    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    top: 0;
  }
`;

const ImageInput: React.FC = () => {
  const [file, setFile] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFile(
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        }),
      );
    },
  });

  return (
    <Container {...getRootProps()}>
      {!file ? (
        <>
          <input {...getInputProps()} />
          <img src={camera} alt="Profile image" />
        </>
      ) : (
        <WithPreview>
          <img src={file.preview} />

          <div>
            <input {...getInputProps()} />
            <img src={camera} alt="Profile image" />
          </div>
        </WithPreview>
      )}
    </Container>
  );
};

export default ImageInput;
