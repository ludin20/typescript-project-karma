import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';

import { useField, useFormikContext } from 'formik';

import camera from '../assets/camera.svg';
import Loading from '../common/Loading';
import Row from '../common/Row';
import { useUploadMedia, useS3Image } from '../../hooks';

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

  @media (max-width: 700px) {
    min-width: 82px;
    width: 82px;
    min-height: 82px;
    height: 82px;
    margin-right: 0;

    img {
      width: 26px;
    }
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

  @media (max-width: 700px) {
    width: 80px;
    height: 80px;

    > img {
      width: 82px;
      height: 82px;
      border-radius: 50%;
    }
  }
`;

const LoadingBar = styled(Row)`
  width: 100%;
  height: 100%;
  flex-wrap: wrap;

  > div {
    color: white;
    width: 100%;
    justify-content: center;
    font-size: 24px;
  }
  @media (max-width: 550px) {
    height: 100px;

    > div {
      font-size: 18px;
    }
  }
`;

interface Props {
  name: string;
  author: string;
  uploadPercent: number;
  isUploadingState: boolean;
}

const ImageInput: React.FC<Props> = ({ name, author, isUploadingState, uploadPercent }) => {
  const [file, setFile] = useState(null);
  const [field] = useField(name);
  const { setFieldValue } = useFormikContext<any>();
  const avatar = useS3Image(field.value, 'thumbSmall');
  const uploadImage = useUploadMedia();

  useEffect(() => {
    if (field.value) {
      setFile({ ...file, preview: field.value, view: avatar });
    }
  }, []); //eslint-disable-line

  const onDrop = async (acceptedFiles: File[]) => {
    const hash = await uploadImage({ media: acceptedFiles[0], author });
    setFieldValue(name, hash.split('&&')[0]);
    setFile(
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
            {
              isUploadingState ? (<LoadingBar>
                <div>{uploadPercent}%</div>
              </LoadingBar>) : <img src={camera} alt="Profile image" />
            }
        </>
      ) : (
        <WithPreview>
          <img src={file.view ? file.view : file.preview} />

          <div>
            <input {...getInputProps()} name={name} />
            {
              isUploadingState ? (<LoadingBar>
                <div>{uploadPercent}%</div>
              </LoadingBar>) : <img src={camera} alt="Profile image" />
            }
          </div>
        </WithPreview>
      )}
    </Container>
  );
};

export default ImageInput;
