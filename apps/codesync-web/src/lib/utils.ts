import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { type Interview } from '@repo/db-codesync';
import {
  addHours,
  intervalToDuration,
  isAfter,
  isBefore,
  isWithinInterval,
} from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getMeetingStatus = (interview: Interview) => {
  const now = new Date();
  const interviewStartTime = interview.startTime;
  const endTime = addHours(interviewStartTime, 1);

  if (interview.status === 'COMPLETED') return 'completed';
  if (isWithinInterval(now, { start: interviewStartTime, end: endTime }))
    return 'live';
  if (isBefore(now, interviewStartTime)) return 'upcoming';
  return 'completed';
};
