import React from 'react';
import styled from 'styled-components';
import { useFormikContext } from 'formik';

import exclude from '../assets/close.svg';

const Container = styled.ul<{ total: string }>`
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0 20px 55px;
`;

const Media = styled.li`
  max-width: 200px;
  position: relative;
  margin: 0 20px 20px 0;

  > img {
    max-width: 200px;
    border-radius: 15px;
  }

  > video {
    max-width: 200px;
    border-radius: 15px;
  }

  button {
    background: none;

    position: absolute;
    top: -5px;
    right: -5px;

    img {
      width: 18px;
    }
  }
`;

interface Props {
  name: string;
  files: any[];
  setFiles(data: any[]): void;
}

const ModalPreviewMedias: React.FC<Props> = ({ name, files, setFiles }) => {
  const { setFieldValue, values } = useFormikContext<any>();

  const handleDeleteFile = (toExclude: number) => {
    const newValues = values[name].filter((value, index) => index !== toExclude);
    setFieldValue(name, newValues);
    const newFiles = files.filter((file, index) => index !== toExclude);
    setFiles(newFiles);
  };

  return (
    <Container total={files.length.toString()}>
      {files.map((file, index) => (
        <Media key={index}>
          {file.type.split('/')[0] == 'image' ? (
            <img src={file.preview} />
          ) : (
            <video>
              <source src={file.preview} type="video/mp4" />
            </video>
          )}
          <button type="button" onClick={() => handleDeleteFile(index)}>
            <img src={exclude} alt="exclude" />
          </button>
        </Media>
      ))}
    </Container>
  );
};

export default ModalPreviewMedias;
