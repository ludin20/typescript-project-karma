import { useMemo } from 'react';
import { formatDistance, parseISO } from 'date-fns';

export function useFormatDistance(date: string) {
  const formattedDate = useMemo(() => {
    return formatDistance(parseISO(date), new Date());
  }, [date]);

  return formattedDate;
}
