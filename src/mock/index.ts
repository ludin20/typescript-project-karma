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
import p1 from './assets/p1.png';
import p2 from './assets/p2.png';
import p3 from './assets/p3.png';
import p4 from './assets/p4.png';
import p5 from './assets/p5.png';
import p6 from './assets/p6.png';

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
    recycles: 22,
    tips: 175,
    power: '6,500',
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
    recycles: 22,
    tips: 175,
    power: '6,500',
    post: {
      image: recycle,
    },
  },
];

export const posts = [
  {
    id: 1,
    type: 'media',
    image: p1,
  },
  {
    id: 2,
    type: 'media',
    image: p2,
  },
  {
    id: 3,
    type: 'media',
    image: p3,
  },
  {
    id: 4,
    type: 'media',
    image: p4,
  },
  {
    id: 5,
    type: 'media',
    image: p5,
  },
  {
    id: 6,
    type: 'media',
    image: p6,
  },
  {
    id: 7,
    type: 'thought',
    date: '3m',
    likes: 536,
    comments: 36,
    recycles: 22,
    tips: 175,
    power: '6,500',
    content: {
      description: 'Momentum is a secret of the universe. ',
      hashtags: ['#studynumbers'],
    },
  },
  {
    id: 8,
    type: 'thought',
    date: '3m',
    likes: 229,
    comments: 17,
    recycles: 8,
    tips: 650,
    power: '9,250',
    content: {
      description: 'What day should we have the KARMA meetup in LA?',
    },
  },
];

export const search = [
  {
    id: 1,
    name: 'Jean',
    username: '@jeanfoton',
    avatar: `https://api.adorable.io/avatars/100/jean`,
    following: false,
    online: false,
    verified: false,
  },
  {
    id: 2,
    name: 'Dallas',
    username: '@dallaskarma',
    avatar: `https://api.adorable.io/avatars/100/dallas`,
    following: true,
    online: true,
    verified: true,
  },
  {
    id: 3,
    name: 'Dimitri',
    username: '@dimitrifoton',
    avatar: `https://api.adorable.io/avatars/100/dimitri`,
    following: false,
    online: false,
    verified: false,
  },
];

export const post = {
  id: 1,
  date: '3m',
  likes: 536,
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
  comments: [
    {
      id: 1,
      author: {
        avatar: `https://api.adorable.io/avatars/100/alexrincon`,
        username: 'alexrincon',
      },
      time: '2h',
      content: 'This looks gorgeous I would love to go to Greece!',
    },
    {
      id: 2,
      author: {
        avatar: `https://api.adorable.io/avatars/100/amyzhu`,
        username: 'amyzhu',
      },
      time: '45m',
      content: 'I’ve been there once before @alexrincon Athens was my favorite :)',
    },
    {
      id: 3,
      author: {
        avatar: `https://api.adorable.io/avatars/100/quezpearson`,
        username: 'quezpearson',
      },
      time: '7s',
      content: 'You guys always show me love I really appreciate it #KARMA',
    },
  ],
};
