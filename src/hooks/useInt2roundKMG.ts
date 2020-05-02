import { useMemo } from 'react';

function truncNb(Nb, ind) {
  let _nb = Nb * Math.pow(10, ind);
  _nb = Math.floor(_nb);
  _nb = _nb / Math.pow(10, ind);
  return _nb;
}

export function useInt2roundKMG(val: number) {
  const str = useMemo(() => {
    if (val >= 1e9) {
      return truncNb(val / 1e9, 1) + ' G';
    } else if (val >= 1e6) {
      return truncNb(val / 1e6, 1) + ' M';
    } else if (val >= 1e3) {
      return truncNb(val / 1e3, 1) + ' k';
    } else {
      return val.toFixed();
    }
  }, [val]);

  return str;
}
