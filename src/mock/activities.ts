import d6 from './assets/d6.png';
import recycle from './assets/recycle.png';
import quez from './assets/quez.png';
import a1 from './assets/a1.png';
import a2 from './assets/a2.png';
import a3 from './assets/a3.png';

const activities = [
  {
    id: 1,
    type: 'like',
    author: {
      name: 'Quez Pearson',
      avatar: quez,
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
      avatar: a1,
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
      avatar: a2,
    },
    content: '75 KARMA',
  },
  {
    id: 4,
    type: 'recycle',
    author: {
      name: 'Jabur',
      avatar: a3,
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
