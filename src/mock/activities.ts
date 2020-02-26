import d6 from './assets/d6.png';
import recycle from './assets/recycle.png';

const activities = [
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
    date: '36m',
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

export default activities;
