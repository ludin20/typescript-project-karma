import p1 from './assets/p1.png';
import p2 from './assets/p2.png';
import p3 from './assets/p3.png';
import p4 from './assets/p4.png';
import p5 from './assets/p5.png';
import p6 from './assets/p6.png';

const posts = [
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

const post = {
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
    avatar: `https://api.adorable.io/avatars/100/quezpearson`,
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

export { post, posts };
