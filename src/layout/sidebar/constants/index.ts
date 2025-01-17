import { NavigationItem } from "../types";
export const NAVIGATION_ITEMS: NavigationItem[] = [
    {
      id: 'dashboard',
      href: '/',             // Changed from /dashboard
      icon: 'ri-function-line',
      label: 'DASHBOARD'
    },
    {
      id: 'tasks',
      href: '/my-tasks',     // Changed from /tasks
      icon: 'ri-menu-line',
      label: 'MY TASK'
    },
  {
    id: 'profile',
    href: '/profile',
    icon: 'ri-user-line',
    label: 'PROFILE'
  },
  {
    id: 'about',
    href: '/about',
    icon: 'ri-information-line',
    label: 'ABOUT'
  }
];