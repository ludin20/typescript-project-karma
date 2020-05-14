export function useFormatDuration(val: number) {
  let durationStr = '';
  const sec_num = Math.floor(val);
  const hours = Math.floor(sec_num / 3600);
  const minutes = Math.floor((sec_num - hours * 3600) / 60);
  const seconds = sec_num - hours * 3600 - minutes * 60;

  if (hours > 0) durationStr += hours < 10 ? '0' + hours.toString() + ':' : hours.toString() + ':';

  durationStr += minutes < 10 ? '0' + minutes.toString() + ':' : minutes.toString() + ':';
  durationStr += seconds < 10 ? '0' + seconds.toString() : seconds.toString();

  return durationStr;
}
