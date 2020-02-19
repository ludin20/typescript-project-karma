import React from 'react';
import styled from 'styled-components';

import { Title, PostCard } from '@karma/ui';

import Layout from '../layout/Layout';

import Posts from './Posts';

const Container = styled.div``;

const Feed: React.FC = () => {
  const data = [
    {
      id: 1,
      date: '3m',
      likes: 536,
      comments: 36,
      recycles: 22,
      tips: 175,
      power: '6,500',
      content: {
        description: 'Be where you need to be when you need to be.',
        hashtags: ['#greece'],
        medias: [
          'https://api.adorable.io/avatars/300/quezpearson',
          'https://api.adorable.io/avatars/300/quezpearson',
          'https://api.adorable.io/avatars/300/quezpearson',
        ],
      },
      author: {
        imageUrl: `https://api.adorable.io/avatars/100/quezpearson`,
        name: 'Quez Pearson',
        username: '@quezpearson',
        following: false,
      },
    },
    {
      id: 2,
      date: '1h',
      likes: 536,
      comments: 36,
      recycles: 22,
      tips: 175,
      power: '6,500',
      content: {
        description:
          'I just came back from Budapest, Hungary. I have to say this is the most beautiful city I’ve ever been to!',
        hashtags: ['#budapest'],
        medias: ['https://api.adorable.io/avatars/1200/quezpearson'],
      },
      author: {
        imageUrl: `https://api.adorable.io/avatars/100/alexfuentes`,
        name: 'Alexis Fuentes',
        username: '@alexfuentes',
        following: true,
      },
    },
  ];

  return (
    <Layout>
      <Container>
        <Title withDropDown>Feed</Title>

        <Posts data={data} renderItem={PostCard} />
      </Container>
    </Layout>
  );
};

export default Feed;
