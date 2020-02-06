const auth = [
  {
    name: 'auth',
    path: 'auth',
    getComponent: () => import('../modules/auth/Auth').then(m => m.default),
    /* children: [
       {
        name: 'auth.login',
        path: 'login',
        getComponent: () => import('../modules/auth/Login').then(m => m.default),
      }, 
    ],*/
  },
];

export default auth;
