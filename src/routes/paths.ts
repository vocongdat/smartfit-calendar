type TRoutes = {
  path: string;
  pathWithParams?: string;
  build: (...args: []) => string;
  notAllow?: (...args: []) => boolean;
};

const url = {
  calendar: '/',
  notFound: '/404',
  internalServerError: '/500',
};

type Routes = Record<keyof typeof url, TRoutes>;

const routes: Routes = {
  calendar: {
    path: url.calendar,
    build: () => url.calendar,
  },
  notFound: {
    path: url.notFound,
    build: () => url.notFound,
  },
  internalServerError: {
    path: url.internalServerError,
    build: () => url.internalServerError,
  },
};

export default routes;
