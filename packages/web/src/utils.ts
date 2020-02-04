import { Context } from 'koa';

export const removeCookie = (ctx: Context) => {
  ctx.cookies.set('karma:sess', '', {
    signed: false,
    // secure: process.env.NODE_ENV === 'production',
    overwrite: true,
  });
};
