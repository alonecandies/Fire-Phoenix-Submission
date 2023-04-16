import { useState, useEffect } from "react";

export const useGetUrlCurrentTab = () => {
  const [tabUrl, setUrl] = useState<string>();

  useEffect(() => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      let tabUrl = tabs[0].url;
      if (!!tabUrl) {
        const origin = new URL(tabUrl).origin;
        setUrl(origin);
      }
    });
  }, []);

  return { tabUrl };
};
