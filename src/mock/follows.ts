import quez from './assets/quez.png';
import a1 from './assets/a1.png';
import a2 from './assets/a2.png';
import a3 from './assets/a3.png';

const following = [
  {
    id: 1,
    name: 'Jean',
    username: '@jeanfoton',
    avatar: quez,
    following: true,
    online: false,
  },
  {
    id: 2,
    name: 'Dallas',
    username: '@dallaskarma',
    avatar: a1,
    following: true,
    online: true,
  },
  {
    id: 3,
    name: 'Dimitri',
    username: '@dimitrifoton',
    avatar: a2,
    following: true,
    online: false,
  },
  {
    id: 4,
    name: 'Aliyah Bernard',
    username: '@aliyahbernard',
    avatar: a3,
    following: true,
    online: false,
  },
  {
    id: 5,
    name: 'Amy Zhu',
    username: '@zhu',
    avatar: a2,
    following: true,
    online: false,
  },
  {
    id: 6,
    name: 'Quez Pearson',
    username: '@quezpearson',
    avatar: quez,
    following: true,
    online: false,
  },
];

const followers = [
  {
    id: 1,
    name: 'Jean',
    username: '@jeanfoton',
    avatar: quez,
    following: true,
    online: false,
  },
  {
    id: 2,
    name: 'Dallas',
    username: '@dallaskarma',
    avatar: a1,
    following: false,
    online: true,
  },
  {
    id: 3,
    name: 'Dimitri',
    username: '@dimitrifoton',
    avatar: a2,
    following: false,
    online: false,
  },
  {
    id: 4,
    name: 'Aliyah Bernard',
    username: '@aliyahbernard',
    avatar: a1,
    following: false,
    online: false,
  },
  {
    id: 5,
    name: 'Amy Zhu',
    username: '@zhu',
    avatar: a3,
    following: true,
    online: false,
  },
  {
    id: 6,
    name: 'Quez Pearson',
    username: '@quezpearson',
    avatar: quez,
    following: true,
    online: false,
  },
];

export { following, followers };
