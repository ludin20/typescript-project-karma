const home = [
  {
    name: 'home',
    path: 'home',
    getComponent: () => import('../modules/home/Feed').then(m => m.default),
  },
];

export default home;
