import a1 from './assets/a1.png';
import quez from './assets/quez.png';
import q1 from './assets/q1.png';
import q2 from './assets/q2.png';
import q3 from './assets/q3.png';
import f2 from './assets/f2.png';

const feed = [
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
      medias: [q1, q2, q3],
    },
    author: {
      avatar: quez,
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
      medias: [f2],
    },
    author: {
      avatar: a1,
      name: 'Alexis Fuentes',
      username: '@alexfuentes',
      following: true,
    },
  },
];

export default feed;
