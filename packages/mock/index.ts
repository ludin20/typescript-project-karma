import d1 from './assets/d1.png';
import d2 from './assets/d2.png';
import d3 from './assets/d3.png';
import d4 from './assets/d4.png';
import d5 from './assets/d5.png';
import d6 from './assets/d6.png';
import d7 from './assets/d7.png';
import d8 from './assets/d8.png';
import d9 from './assets/d9.png';
import recycle from './assets/recycle.png';

export const discover = [
  {
    id: 1,
    image: d1,
  },
  {
    id: 2,
    image: d2,
  },
  {
    id: 3,
    image: d3,
  },
  {
    id: 4,
    image: d4,
  },
  {
    id: 5,
    image: d5,
  },
  {
    id: 6,
    image: d6,
  },
  {
    id: 7,
    image: d7,
  },
  {
    id: 8,
    image: d8,
  },
  {
    id: 9,
    image: d9,
  },
];

export const activities = [
  {
    id: 1,
    type: 'like',
    author: {
      name: 'Quez Pearson',
      imageUrl: `https://api.adorable.io/avatars/100/quezpearson`,
    },
    post: {
      image: d6,
    },
    content: 'The Lakers will win the…',
    date: '2h',
  },
  {
    id: 2,
    type: 'comment',
    author: {
      name: 'bennythegoat',
      imageUrl: `https://api.adorable.io/avatars/100/bennythegoat`,
    },
    content:
      '@dallasrushing you should come to play 5 on 5 with us at Domenic Massari park next Friday around 7p.m. What do you think?',
    date: '2h',
    likes: 19,
    comments: 36,
    reTweets: 22,
    item: 175,
    item2: '6,500',
  },
  {
    id: 3,
    type: 'tip',
    author: {
      name: 'Yuly Gonzalez',
      imageUrl: `https://api.adorable.io/avatars/100/yuly`,
    },
    content: '75 KARMA',
  },
  {
    id: 4,
    type: 'recycle',
    author: {
      name: 'Jabur',
      imageUrl: `https://api.adorable.io/avatars/100/jabur`,
    },
    content: 'I just came back from…',
    date: '7h',
    likes: 19,
    comments: 36,
    reTweets: 22,
    item: 175,
    item2: '6,500',
    post: {
      image: recycle,
    },
  },
];
