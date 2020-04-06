import React, { useState, useEffect, useCallback } from 'react';
import styled, { css } from 'styled-components';
import graphql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import CreateProfileModal from '../profile/CreateProfileModal';

import { withApollo } from '../../apollo/Apollo';

import Sidebar from './navbar/Sidebar';
import Header from './header/Header';
import Aside from './aside/Aside';
import Bottombar from './navbar/Bottombar';

const Wrapper = styled.div`
  background: ${props => props.theme.black};
  display: flex;
  width: 100%;
`;

const Container = styled.div<{ collapsed: boolean; shouldHideHeader: boolean }>`
  min-height: 100vh;
  width: ${props => (!props.collapsed ? 'calc(100% - 350px)' : 'calc(100% - 170px)')};
  padding: 30px 0 50px;
  margin-left: 60px;

  left: ${props => (!props.collapsed ? '280px' : '100px')};

  position: relative;

  @media (max-width: 1200px) {
    min-height: 100vh;
    min-width: calc(100% - 170px) !important;
    max-width: calc(100% - 170px) !important;

    left: 100px;
  }

  @media (max-width: 700px) {
    min-width: 100% !important;
    max-width: 100% !important;
    margin-left: 0;
    padding: 30px 15px 140px;

    left: 0;
  }

  ${props =>
    props.shouldHideHeader &&
    css`
      @media (max-width: 700px) {
        padding: 0 0 140px;
      }
    `}
`;

const ContentWrapper = styled.div<{ shouldHideHeader: boolean }>`
  display: flex;
  justify-content: space-between;
  width: 100%;

  margin-top: 80px;

  ${props =>
    props.shouldHideHeader &&
    css`
      @media (max-width: 700px) {
        margin-top: 0;
      }
    `}
`;

const Content = styled.div`
  width: calc(100% - (368px + 80px));

  @media (max-width: 1200px) {
    width: calc(100% - (300px + 80px));
  }

  @media (max-width: 1100px) {
    width: 100%;
    margin-right: 30px;
  }

  @media (max-width: 700px) {
    margin-right: 0;
  }
`;

interface Props {
  shouldHideCreatePost?: boolean;
  shouldHideHeader?: boolean;
  author: string;
}

const GET_PROFILE = graphql`
  query Layout($accountname: String!, $pathBuilder: any) {
    profile(accountname: $accountname) @rest(type: "Profile", pathBuilder: $pathBuilder) {
      username
      displayname
      author
      hash
      bio
    }
  }
`;

const Layout: React.FC<Props> = ({ children, shouldHideCreatePost, shouldHideHeader, author, ...props }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { data } = useQuery(GET_PROFILE, {
    variables: {
      accountname: author,
      pathBuilder: () => `profile/${author}?domainID=${1}`,
    },
  });

  useEffect(() => {
    if (data && (!data.profile || !data.profile.hash)) setModalIsOpen(true);
  }, [data]);

  const close = useCallback(() => {
    if (data && data.profile.hash) {
      setModalIsOpen(false);
    }
  }, [data]);

  return (
    <Wrapper {...props}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} author={author} profile={data && data.profile} />

      <Container collapsed={collapsed} shouldHideHeader={shouldHideHeader}>
        <Header
          author={author}
          collapsed={collapsed}
          shouldHideCreatePost={shouldHideCreatePost}
          shouldHideHeader={shouldHideHeader}
        />

        <ContentWrapper shouldHideHeader={shouldHideHeader}>
          <Content>{children}</Content>
          <Aside />
        </ContentWrapper>
      </Container>

      <Bottombar />

      {modalIsOpen && <CreateProfileModal open close={close} profile={data && data.profile} />}
    </Wrapper>
  );
};

export default withApollo({ ssr: true })(Layout);
