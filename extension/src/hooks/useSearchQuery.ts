import { useEffect, useState } from "react";
import useWindowLocation from "src/hooks/useWindowLocation";

export const useSearchQuery = () => {
  const [queries, setQueries] = useState<any>();
  const location = useWindowLocation();

  useEffect(() => {
    if (!location || !location?.search) return;
    const urlSearchParams = new URLSearchParams(location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    setQueries(params);
  }, [location]);

  return { queries };
};
