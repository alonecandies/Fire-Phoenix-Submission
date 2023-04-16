import { useState, useEffect } from "react";
import { sendMessage } from "src/services/extension";

import { useGetUrlCurrentTab } from "./useGetUrlCurrenTab";
import { useSearchQuery } from "./useSearchQuery";

const useGetPageInfo = () => {
  const [pageInfo, setPageInfo] = useState<any>();
  const { tabUrl } = useGetUrlCurrentTab();
  const { queries } = useSearchQuery();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!tabUrl && !queries?.origin) {
      setLoading(false);
      return;
    }
    sendMessage({ type: "get_page_info", url: queries?.origin ?? tabUrl })
      .then((res) => {
        setPageInfo(res);
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, [tabUrl, queries]);

  return { pageInfo, loading };
};

export default useGetPageInfo;
