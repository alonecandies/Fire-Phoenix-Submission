import { useCallback, useMemo } from "react";
import { useHistory, useLocation } from "react-router";

export const useQuery = () => {
  const { search, pathname } = useLocation();
  const history = useHistory();

  const query = useMemo(() => new URLSearchParams(search), [search]);
  const setQuery = useCallback(
    (newQuery: string) => {
      history.replace({
        pathname: pathname,
        search: newQuery,
      });
    },
    [history, pathname]
  );

  return { query, setQuery };
};
