import React from 'react';
import styled from 'styled-components';

import Row from '../common/Row';
import Avatar from '../common/Avatar';
import TextInput from '../form/TextInput';

import sendComment from '../assets/send-comment.svg';

const Container = styled(Row)`
  @media (max-width: 550px) {
    width: 100%;
    background: ${props => props.theme.dark};
    padding: 16px 16px 36px;
    border-radius: 25px 25px 0 0;
    box-shadow: 0px 3px 20px #00000099;

    position: fixed;
    bottom: 80px;
    left: 0;
    z-index: 3;
  }
`;

const StyledAvatar = styled(Avatar)`
  @media (max-width: 550px) {
    width: 40px;
    height: 40px;
    margin-right: 0;
  }
`;

const Input = styled(TextInput)`
  margin-left: 5px;
  border-radius: 100px;
  flex: 1;
  padding: 10px 15px;

  @media (max-width: 550px) {
    background: #000;
    margin-left: 10px;

    input {
      font-size: 16px;
    }
  }
`;

const SendButton = styled.button`
  background: none;
  position: absolute;
  right: 25px;

  @media (min-width: 549px) {
    display: none;
  }
`;

interface Props {
  avatar: string;
}

const CreateComment: React.FC<Props> = ({ avatar }) => {
  return (
    <Container>
      <StyledAvatar src={avatar} alt="avatar" />
      <Input placeholder="Write a comment" dark font="small" />
      <SendButton>
        <img src={sendComment} alt="Send Comment" />
      </SendButton>
    </Container>
  );
};

export default CreateComment;
