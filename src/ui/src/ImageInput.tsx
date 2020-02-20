import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';

import { useField, useFormikContext } from 'formik';

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

interface Props {
  name: string;
}

const ImageInput: React.FC<Props> = ({ name }) => {
  const [file, setFile] = useState(null);
  const [field] = useField(name);
  const { setFieldValue } = useFormikContext<any>();

  useEffect(() => {
    if (field.value) {
      setFile({ ...file, preview: field.value });
    }
  }, []); //eslint-disable-line

  const onDrop = acceptedFiles => {
    setFile(
      Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0]),
      }),
    );

    setFieldValue(
      name,
      Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0]),
      }),
    );
  };

  const { getRootProps, getInputProps } = useDropzone({ accept: 'image/*', onDrop });

  return (
    <Container {...getRootProps()}>
      {!file ? (
        <>
          <input {...getInputProps()} name={name} />
          <img src={camera} alt="Profile image" />
        </>
      ) : (
        <WithPreview>
          <img src={file.preview} />

          <div>
            <input {...getInputProps()} name={name} />
            <img src={camera} alt="Profile image" />
          </div>
        </WithPreview>
      )}
    </Container>
  );
};

export default ImageInput;
