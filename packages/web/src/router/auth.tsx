const auth = [
  {
    name: 'auth',
    path: 'auth',
    getComponent: () => import('../modules/auth/Auth').then(m => m.default),
  },
];

export default auth;
