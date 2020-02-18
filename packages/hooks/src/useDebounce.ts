import { Cancelable, DebounceSettings } from 'lodash';
import debounce from 'lodash/debounce';
import { useRef, useEffect, useMemo } from 'react';

export function useDebounce<Func extends (...args: any[]) => any>(
  func: Func,
  time: number,
  { leading = true, trailing = true, maxWait }: DebounceSettings = {},
) {
  const throttle = useRef<Func & Cancelable>();
  useEffect(() => {
    const debounced = debounce(func, time, normalizeSettings(leading, trailing, maxWait));
    throttle.current = debounced;
    return () => {
      debounced.cancel();
    };
  }, [func, time, leading, trailing, maxWait]);
  return useMemo(() => {
    const callback = (...args) => {
      return throttle.current!(...args);
    };
    callback.cancel = () => {
      if (throttle.current) {
        throttle.current.cancel();
      }
    };
    callback.flush = () => {
      if (throttle.current) {
        throttle.current.flush();
      }
    };
    return callback;
  }, []);
}

function normalizeSettings(leading: boolean, trailing: boolean, maxWait: number | undefined) {
  const settings: DebounceSettings = {
    leading,
    trailing,
  };
  if (maxWait != null) {
    settings.maxWait = maxWait;
  }
  return settings;
}
