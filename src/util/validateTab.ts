import { NextPageContext } from 'next';
import Router from 'next/router';

interface Context extends NextPageContext {
  query: {
    tab?: string | null;
  };
}

const validateTab = (ctx: Context, defaultRoute: string, tabs: string[]) => {
  const tab = tabs.find(t => t === ctx.query.tab);

  if (!tab) {
    if (typeof window === 'undefined') {
      ctx.res.writeHead(302, { Location: defaultRoute });
      ctx.res.end();
    } else {
      Router.push(defaultRoute);
    }
  }

  return tab;
};

export default validateTab;
