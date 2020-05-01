import { useMemo } from 'react';
import { formatDistance, formatDistanceStrict, parseISO } from 'date-fns';

export function useFormatDistance(date: string) {
  const formattedDate = useMemo(() => {
    return formatDistance(parseISO(date), new Date());
  }, [date]);

  return formattedDate;
}

export function useFormatDistanceStrict(date: string) {
  const formattedDate = useMemo(() => {
    return formatDistanceStrict(parseISO(date), new Date());
  }, [date]);

  return formattedDate;
}
