import q1 from './assets/q1.png';
import q2 from './assets/q2.png';
import q3 from './assets/q3.png';
import q4 from './assets/q4.png';
import q5 from './assets/q5.png';
import q6 from './assets/q6.png';

const posts = [
  {
    id: 1,
    type: 'media',
    image: q1,
  },
  {
    id: 2,
    type: 'media',
    image: q2,
  },
  {
    id: 3,
    type: 'media',
    image: q3,
  },
  {
    id: 4,
    type: 'media',
    image: q4,
  },
  {
    id: 5,
    type: 'media',
    image: q5,
  },
  {
    id: 6,
    type: 'media',
    image: q6,
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

export default posts;
