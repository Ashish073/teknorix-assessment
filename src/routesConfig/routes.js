import { lazy } from 'react';

import { config } from './routeConfig';

const DashboardComp = lazy(() => import('../pages/Dashboard'));
const JobDetailsComp = lazy(() => import('../pages/JobDetail'));

export const routes = [
    {
        path: config.home.path,
        element: DashboardComp,
        slug: config.home.slug,
    },
    {
        path: config.job.path,
        element: JobDetailsComp,
        slug: config.job.slug,
    },
];