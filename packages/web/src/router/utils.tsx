import { stringify } from 'query-string';

interface ChangeQueryParamsOptions {
  stringified?: boolean;
}
export function changeQueryParams<NewValueType>(
  queryParams: {},
  queryKey: string,
  newValue: NewValueType,
  { stringified }: ChangeQueryParamsOptions = { stringified: true },
) {
  let query = { [queryKey]: newValue };
  const keys = Object.keys(queryParams);

  // if there is any query param
  if (keys.length) {
    query = keys.reduce((prev, curr) => {
      if (curr === queryKey) {
        return { ...prev, [curr]: newValue };
      }
      return { ...prev, [curr]: queryParams[curr] };
    }, query);
  }

  return stringified ? stringify(query) : query;
}
