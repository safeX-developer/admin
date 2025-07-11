import { lazy } from 'react';
import { Navigate } from 'react-router';

// Lazy load pages for better performance
const Landing = lazy(() => import('./pages/Landing'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Users = lazy(() => import('./pages/Users'));
const Transactions = lazy(() => import('./pages/Transactions'));
const Tasks = lazy(() => import('./pages/Tasks'));

export const routes = [

  {
    path: '/',
    element: <Navigate to="/dashboard" /> ,
    name: 'Home',
    showInNav: false,
  },
    {
    path: '/dashboard',
    element: <Dashboard />,
    name: 'Dashboard',
    showInNav: true,
  },
  {
    path: '/users',
    element: <Users />,
    name: 'Users',
    showInNav: true,
  },
  {
    path: '/tasks',
    element: <Tasks />,
    name: 'Tasks',
    showInNav: true,
  },
    {
    path: '/transactions',
    element: <Transactions />,
    name: 'Transactions',
    showInNav: true,
  },
  {
    path: '*',
    element: <NotFound />,
    name: 'Not Found',
    showInNav: false,
  },
];