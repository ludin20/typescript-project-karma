import React from 'react';
import styled from 'styled-components';
import { useFormikContext } from 'formik';

import exclude from '../assets/close.svg';

const Container = styled.ul<{ total: string }>`
  display: grid;
  grid-template-columns: ${props => `repeat(${props.total}, 1fr)`};
  grid-gap: 20px;
  margin: 20px 0 40px 55px;
`;

const Media = styled.li`
  max-width: 200px;
  position: relative;

  > img {
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
          <img src={file.preview} />
          <button type="button" onClick={() => handleDeleteFile(index)}>
            <img src={exclude} alt="exclude" />
          </button>
        </Media>
      ))}
    </Container>
  );
};

export default ModalPreviewMedias;
