import { Clock, Code2, Calendar, Users } from 'lucide-react';

export const BACKEND_URL = 'http://localhost:8000';

export const DEFAULT_PAGE_SIZE = 12;

export type QuickActionType = (typeof QUICK_ACTIONS)[number];

export const QUICK_ACTIONS = [
  {
    icon: Code2,
    title: 'New Call',
    description: 'Start an instant call',
    color: 'primary',
    gradient: 'from-primary/10 via-primary/5 to-transparent',
  },
  {
    icon: Users,
    title: 'Join Interview',
    description: 'Enter via invitation link',
    color: 'purple-500',
    gradient: 'from-purple-500/10 via-purple-500/5 to-transparent',
  },
  {
    icon: Calendar,
    title: 'Schedule',
    description: 'Plan upcoming interviews',
    color: 'blue-500',
    gradient: 'from-blue-500/10 via-blue-500/5 to-transparent',
  },
  {
    icon: Clock,
    title: 'Recordings',
    description: 'Access past interviews',
    color: 'orange-500',
    gradient: 'from-orange-500/10 via-orange-500/5 to-transparent',
  },
];
