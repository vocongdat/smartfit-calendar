import { Suspense, lazy } from 'react';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import routes from './paths';

const AppLayout = lazy(() => import('@/templates/layout/app-layout'));

const Calender = lazy(() => import('@/pages/calendar'));
const Page404 = lazy(() => import('@/pages/not-found'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route path={routes.calendar.path} element={<Calender />}></Route>
      <Route path="*" element={<Page404 />} />
    </Route>,
  ),
);

const RouteController = () => {
  return (
    <Suspense
      fallback={
        <div className="flex app-min-h-screen items-center justify-center">
          <span className="size-8 animate-spin rounded-full border-2 border-line border-t-accent" />
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default RouteController;
