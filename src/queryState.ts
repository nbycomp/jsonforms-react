import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from 'lz-string';
import qs from 'qs';
import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useQueryState = (
  query: string,
): [string, (s: string | undefined) => void] => {
  const location = useLocation();
  const navigate = useNavigate();

  const existingQueries = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  }) as { [key: string]: string };

  const setQuery = useCallback(
    (value: string | undefined) => {
      if (!value) return;

      const queryString = qs.stringify(
        { ...existingQueries, [query]: compressToEncodedURIComponent(value) },
        { skipNulls: true },
      );

      navigate(`${location.pathname}?${queryString}`);
    },
    [existingQueries, location.pathname, navigate, query],
  );

  const value = existingQueries[query]
    ? decompressFromEncodedURIComponent(existingQueries[query])
    : '';

  return [value, setQuery];
};
